import React, { useState } from 'react';

import { addItem } from '../api/inventoryApi';

const AddItem = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addItem({ name, location, tags });
            alert(response.data.message);
            setName('');
            setLocation('');
            setTags('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required           
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <button type="submit">Add Item to Inventory</button>
        </form>
    );
};

export default AddItem;