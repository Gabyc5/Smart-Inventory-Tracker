import React, { useState } from "react";
import { searchItem } from "../api/inventoryApi";

const SearchItem = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await searchItem(query);
            setResults(response.data.similar_items);
        } catch (error) {
            console.error('Error searching items:', error);
        }
    };

    return (
        <div>
            <h2>Search Inventory</h2>
            <input
                type="text"
                placeholder="Search for an item..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((item) => (
                    <li key={item.item_id}>
                        ID: {item.item_id} - Similarity: {item.similarity_score.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchItem;