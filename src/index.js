import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create an initial array of objects with properties relevant to todo
// component data, i.e., we have 'name' of task.
const DATA = [
 { id:"todo-0", name:"Eat enough", completed: true },
 { id:"todo-1", name:"Sleep well", completed: false },
 { id:"todo-2", name:"Repeat", completed: false },
 { id:"todo-3", name:"Make money", completed: true },
];

// We create a root to display React components inside a DOM node.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);
