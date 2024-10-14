import React, { useState } from "react";
import "./App.css";

const expensiveOperation = (item: string): string => {
  let result = item;
  for (let i = 0; i < 1000; i++) {
    result = result.split("").reverse().join("");
  }
  return result;
};

const generateDynamicItems = (n: number): string[] => {
  return Array.from({ length: n }, (_, i) => `Item ${i + 1}`);
};

const LaggyComputation: React.FC<{ count: number; laggyFunction: () => string }> = ({ count, laggyFunction }) => {
  console.log("Rendering LaggyComputation");

  return (
    <div>
      <p>Computation result: {laggyFunction()}</p>
      <p>Count value: {count}</p>
    </div>
  );
};

const FirstList: React.FC<{ items: string[]; onAddItem: (item: string) => void }> = ({ items, onAddItem }) => {
  const [newItem, setNewItem] = useState<string>("");
  const [count, setCount] = useState(0);

  console.log("Rendering FirstList");

  const laggyFunction = () => {
    const start = Date.now();
    while (Date.now() - start < 1000) {}
    return `Expensive computation result for count: ${count}`;
  };

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      onAddItem(newItem);
      setNewItem("");
    }
  };

  return (
    <div>
      <LaggyComputation count={count} laggyFunction={laggyFunction} />
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        className="input-field"
      />
      <button onClick={handleAddItem} className="add-button">
        Add Item
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const SecondList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{expensiveOperation(item)}</li>
      ))}
    </ul>
  );
};

const App: React.FC = () => {
  const dynamicItemCount = 5000;

  const [firstListItems, setFirstListItems] = useState<string[]>([]);
  const [secondListItems] = useState<string[]>(generateDynamicItems(dynamicItemCount));
  
  const addToFirstList = (newItem: string) => {
    setFirstListItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="container">
      <div className="list-section">
        <h2>First List (can add items)</h2>
        <FirstList items={firstListItems} onAddItem={addToFirstList} />
      </div>
      <div className="list-section">
        <h2>Second List (with expensive computation)</h2>
        <SecondList items={secondListItems} />
      </div>
    </div>
  );
};

export default App;
