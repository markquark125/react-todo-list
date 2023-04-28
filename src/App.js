import { useState } from 'react';
import Todo from "./components/Todo";
import Form from "./components/Forms";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

// An object where each key is the name of a filter and each 
// property is the behavior associated with that name.
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

// We are using the Object.keys() method to collect an array
// of FILTER_NAMES:
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
  // We store our tasks in state. Recall in index.js, we 
  // had prop 'tasks={DATA}' in <App/> component.
  const [tasks, setTasks] = useState(props.tasks);

  // Store active filter as state.
  const [filter, setFilter] = useState('All');

  /***************  CALLBACK PROPS **********/
  // Callback prop. Use setTasks hook to update tasks list. We put
  // 'name' into a object similar to our existing tasks. Use spread
  // syntax to copy existing array and add object at the end. We then
  // pass this array into 'setTask()' to update the state.
  function addTask(name) {
    // Note, 'name' position in object relevant to other tasks
    const newTask = {id:`todo-${nanoid()}`, name, completed:false};
    // If you want newer task at bottom of list, use `[...tasks, newTask]`
    setTasks([newTask,...tasks]);
  }
  
  // To sync checked-box in HTML and task object 'complete'.
  function toggleTaskComplete(id) {
    // We need a new, updated array. Map over 'tasks' array, checking
    // for checked-mark task ID.
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        // Use object spread to make a new object whose `completed`
        // prop is inverted. Line below used for debugging.
        console.log({...task, completed:!task.completed}); //DEBUGGER
        return {...task, completed: !task.completed};
      }
      // Else, return original object.
      return task;
    });

    // useState function at play. Updated tasks array passed to state
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    //console.log(id);

    //We exclude a task from the new array if its `id` prop matches
    // the `id` argument passed into deleteTask function.
    const remainingTasks = tasks.filter((task) => id !== task.id);
    // Then we set state with updated array 'remainingTasks'.
    setTasks(remainingTasks);
  }

  // Find 'id' of task to be editied. Note the two parameters.
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (task.id === id) {
        return ({...task, name: newName});
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  /***************  CALLBACK PROPS END **********/


  // Use array of task objects' properites to pass into Todo
  // components' props. `map` method returns array of 
  // Todo components, with relevant props.
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id} 
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskComplete={toggleTaskComplete} // Callback prop
      deleteTask={deleteTask} // Callback prop
      editTask={editTask} // Callback prop
      />
    )
  );

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ));

  // Set heading with number of tasks and correct noun.
  const tasksNoun = taskList.length !== 1 ? "tasks": "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  
  // Note the callback prop in <Form>
  return (
    <div className="todoapp stack-large">

      <h1>TodoMatic</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>

    </div>

  );
}

export default App;
