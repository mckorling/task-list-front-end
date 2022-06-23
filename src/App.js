import React from 'react';
import TaskList from './components/TaskList.js';
import TaskForm from './components/TaskForm.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TaskListService } from './services/TaskListService.js';
import Task from './components/Task.js';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTasksFromAPI();
  }, []);

  const getTasksFromAPI = () => {
    axios
      .get('/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        setErrorMessage(
          <section>
            The databade responded with this message:{' '}
            {error.response.statusText}
          </section>
        );
        console.log(error.response);
      });
  };

  const makeNewTask = (data) => {
    console.log(data);
    axios
      .post('/tasks', data)
      .then((response) => {
        getTasksFromAPI();
      })
      .catch((error) => {
        console.log("couldn't make a new task");
      });
  };

  const updateTaskData = (id) => {
    const newTasks = [...tasks];
    let targetTask;

    for (let task of newTasks) {
      if (task.id === id) {
        // task.isComplete = !task.isComplete;
        targetTask = task;
      }
    }
    if (targetTask.is_complete) {
      TaskListService(targetTask.id)
        .then(() => {
          // eslint-disable-next-line camelcase
          targetTask.is_complete = !targetTask.is_complete;
          setTasks(newTasks);
        })
        .catch((error) => {
          setErrorMessage(
            <section>
              Can&apos;t mark task incomplete: {error.response.data.message}
            </section>
          );
          console.log(error.response);
        });
    } else {
      axios
        .patch(`/tasks/${targetTask.id}/mark_complete`)
        .then(() => {
          // eslint-disable-next-line camelcase
          targetTask.is_complete = !targetTask.is_complete;
          setTasks(newTasks);
        })
        .catch((error) => {
          setErrorMessage(
            <section>
              Can&apos;t mark task incomplete: {error.response.data.message}
            </section>
          );
          console.log(error.response);
        });
    }
  };

  const deleteTask = (id) => {
    axios
      .delete(`/tasks/${id}`)
      .then(() => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
      })
      .catch((error) => {
        setErrorMessage(<section>Can&apos;t delete task</section>);
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskForm handleTasks={makeNewTask}></TaskForm>
        <div>
          {
            <TaskList
              tasks={tasks}
              onCompleteTask={updateTaskData}
              onDeleteTask={deleteTask}
            />
          }
        </div>
        <div className="error">{errorMessage}</div>
      </main>
    </div>
  );
};

export default App;
