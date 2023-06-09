import React, { useState } from 'react';

export default function Todo(props) {
  //console.log(props)
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  function handleChange(e) {
    //console.log(newName); 
    // console.log(e.target.value);
    setNewName(e.target.value);
  }

  // To handle sumbit. Using callback prop 'editTask'
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  // Two templates: a "view" template, when just viewing a todo; an
  // "editing" template, when we are editing a todo.
const editingTemplate = (
  <form className="stack-small" onSubmit={handleSubmit}>
    <div className="form-group">
      <label className="todo-label" htmlFor={props.id}>
        New name for {props.name}
      </label>
      <input 
        id={props.id} 
        className="todo-text" 
        type="text"
        value={newName}
        onChange={handleChange}
        />
    </div>
    <div className="btn-group">
      <button 
        type="button"
        className="btn todo-cancel"
        onClick={() => setEditing(false)}>
        Cancel
        <span className="visually-hidden"> renaming {props.name}</span>
      </button>
      <button type="submit" className="btn btn__primary todo-edit">
        Save
        <span className="visually-hidden"> renaming {props.name}</span>
      </button>
    </div>
  </form>
);

const viewTemplate = (
  <div className="stack-small">
    <div className="c-cb">
      <input
        id={props.id}
        type="checkbox"
        defaultChecked={props.completed}
        onChange={() => props.toggleTaskComplete(props.id)}
        />
      <label className="todo-label" htmlFor={props.id}>
        {props.name}
      </label>
    </div>
    <div className="btn-group">
      <button type="button" className="btn" onClick={() => setEditing(true)}>
        Edit <span className="visually-hidden"> {props.name}</span>
      </button>
      <button
        type="button"
        className="btn btn__danger"
        onClick={() => props.deleteTask(props.id)}
        >
        Delete <span className="visually-hidden"> {props.name}</span>
      </button>
    </div>

  </div>
);

  return (
  <li className="todo stack-small">
    {isEditing ? editingTemplate : viewTemplate}
  </li>
  );
}