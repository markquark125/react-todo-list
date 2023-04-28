import React, { useState } from 'react';

export default function Form(props) {
  //const name = props.name;

  // state for name of task.
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // Check for empty input
    if (name !== '') {
      props.addTask(name);
      setName("");
    }
  }

  // state changes with text input
  function handleChange(e) {
    // console.log(e.target.value);
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done? 
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />

      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>

    </form>
  );
}