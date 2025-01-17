import React, { useState } from 'react';

import { addItem } from '../api/inventoryApi';

const AddItem = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState('');
    const [sublocation, setSublocation] = useState('');

    const sublocations = {
        Office: ['Dad desk', 'Dresser', 'Bookshelf', 'Mom desk'],
        Garage: ['Back shelf1', 'Back shelf2', 'Back shelf3', 'Right shelf1', 'Right shelf2', 'Toolbox', 'Gym', 'Corner stands'],
        Kitchen: ['Top cabinet1', 'Top cabinet2', 'Top cabinet3', 'Top cabinet4', 'Top cabinet5', 'Top cabinet6', 'Top cabinet7', 'Top cabinet8', 'Corner cabinets','Sink cabinets', 'Island cabinet', 'Dog area'],
        Shed: ['Top row', 'Middle row', 'Bottom row']
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addItem({ name, location, sublocation, tags });
            alert(response.data.message);
            setName('');
            setLocation('');
            setTags('');
            setSublocation('');
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
            <select 
                value={location} 
                onChange={(e) => {
                    setLocation(e.target.value);
                    setSublocation(''); 
                }}
                required
            >
                <option value="">Select Location</option>
                {Object.keys(sublocations).map((loc) => (
                    <option key={loc} value={loc}>
                        {loc}
                    </option>
                ))}
            </select>
            {location && (
                <select
                    value={sublocation}
                    onChange={(e) => setSublocation(e.target.value)}
                    required
                >
                    <option value="">Select Sublocation</option>
                    {sublocations[location].map((sub) => (
                        <option key={sub} value={sub}>
                            {sub}
                        </option>
                    ))}
                </select>
            )}
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