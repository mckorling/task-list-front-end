import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const updateTaskData = (id) => {
    const newTasks = [...tasks];
    for (let task of newTasks) {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
    }
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasks} onCompleteTask={updateTaskData} />}</div>
      </main>
    </div>
  );
};

export default App;
