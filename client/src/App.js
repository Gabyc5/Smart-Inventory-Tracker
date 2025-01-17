import React from 'react';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import SearchItem from './components/SearchItem';

const App = () => {
  return (
    <div className="app-container">
      <h1>Inventory Tracker</h1>
      <div className="content">
        <div className="left-column">
          <SearchItem />
          <AddItem />
        </div>
        <div className="right-column">
          <ItemList />
        </div>
      </div>
    </div>
  );
};

export default App;
