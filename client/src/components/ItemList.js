import React, { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../api/inventoryApi';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await getItems();
            setItems(response.data.items);
        } catch (error) {
            console.error('Error getting items:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteItem(id);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            <h2>Inventory List</h2>
            <ul>
                {items.map((item) => (
                    <li key={item[0]}>
                        {item[1]} - {item[2]} - {item[3]}{' '}
                        <button onClick={() => handleDelete(item[0])}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;