from flask_cors import CORS
import psycopg2
from flask import Flask, jsonify, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords


app = Flask(__name__)
CORS(app, origins=["https://inventory-frontend-ffml.onrender.com"])

def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        dbname='inventory_db',
        user='opuser',
        password='access!Br2'
    )
    return conn

def create_table():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
            CREATE TABLE IF NOT EXISTS inventory (
                   id SERIAL PRIMARY KEY,
                   name TEXT NOT NULL,
                   location TEXT,
                   tags TEXT
            )
        ''')
    
    conn.commit()
    cursor.close()
    conn.close()

def get_similar_items(query):
    vectorizer = TfidfVectorizer(stop_words='english') 
    #stop_words = set(stopwords.words('english'))

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, tags FROM inventory")
    items = cursor.fetchall()
    cursor.close()
    conn.close()

    items_text = [item[1] + " " + item[2] for item in items]
    items_id = [item[0] for item in items]

    query = query.lower()

    #vectorizer = TfidfVectorizer(stop_words=stop_words)
    tfidf_matrix = vectorizer.fit_transform(items_text)

    query_vec = vectorizer.transform([query])

    cosine_similarities = cosine_similarity(query_vec, tfidf_matrix).flatten()

    similar_items = sorted(zip(items_id, cosine_similarities), key=lambda x: x[1], reverse=True)

    top_items = []
    for item_id, similarity in similar_items[:3]:
        top_items.append({
            "item_id": item_id,
            "similarity_score": similarity
        })

    return top_items

@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"})

@app.route('/add_item', methods=['POST'])
def add_item():
    data = request.get_json()
    name = data['name']
    location = data.get('location', '') 
    tags = data.get('tags', '')

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO inventory (name, location, tags)
        VALUES (%s, %s, %s)
    ''', (name, location, tags))

    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({"message": "Item added successfully!"}), 201

@app.route('/items', methods=['GET'])
def get_items():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM inventory')
    items = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({"items": items}), 200

@app.route('/update_item/<int:id>', methods=['PUT'])
def update_item(id):
    data = request.get_json()
    name = data.get('name')
    location = data.get('location')
    tags = data.get('tags')

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        UPDATE inventory
        SET name = %s, location = %s, tags = %s
        WHERE id = %s
    ''', (name, location, tags, id))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Item updated successfully!"}), 200

@app.route('/delete_item/<int:id>', methods=['DELETE'])
def delete_item(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('DELETE FROM inventory WHERE id = %s', (id,))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Item deleted successfully!"}), 200

@app.route('/search_item', methods=['GET'])
def search_item():
    query = request.args.get('query')
    if not query:
        return jsonify({"message": "No query provided!"}), 400

    similar_items = get_similar_items(query)

    return jsonify({"similar_items": similar_items}), 200


if __name__ == '__main__':
    create_table()
    app.run(debug=True)