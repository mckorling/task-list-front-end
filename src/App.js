import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    axios
      .get('https://task-list-api-c17.herokuapp.com/tasks')
      .then((response) => {
        //console.log(response.data.isComplete);
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
  }, []);

  const updateTaskData = (id) => {
    const newTasks = [...tasks];
    let targetTask;

    for (let task of newTasks) {
      if (task.id === id) {
        // task.isComplete = !task.isComplete;
        targetTask = task;
        console.log(targetTask.is_complete);
      }
    }
    if (targetTask.is_complete) {
      console.log('inside if statement');
      axios
        .patch(
          `https://task-list-api-c17.herokuapp.com/tasks/${targetTask.id}/mark_incomplete`
        )

        .then(() => {
          console.log('toggle working');
          targetTask.is_complete = false;
          setTasks(newTasks);
        })
        .catch((error) => {
          setErrorMessage(
            <section>
              Can&apos;t mark task incomplete: {error.response.statusText}
            </section>
          );
          console.log(error.response);
        });
    }
    // axios
    // .put(`http://127.0.0.1:5000/cats/${targetCat.id}`, {
    //   name: targetCat.name,
    //   age: targetCat.age + 1,
    //   color: targetCat.color,
    //   saying: targetCat.saying,
    // })
    // .then((response) => {
    //   // everything worked the way we wanted
    //   // now can update current data
    //   targetCat.age++;
    //   // call setCats to update array
    //   setCats(newCats);
    // })
    // .catch((error) => {
    //   console.log("couldn't age cat");
    // });
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
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
