import React from 'react';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import SearchItem from './components/SearchItem';

const App = () => {
  return (
    <div>
      <h1>Smart Inventory Tracker</h1>
      <AddItem />
      <ItemList />
      <SearchItem />
    </div>
  );
};

export default App;
