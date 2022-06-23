import { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

const defaultTask = {
  title: '',
  description: '',
};

const TaskForm = (props) => {
  const [taskData, setTaskData] = useState(defaultTask);

  const handleTaskInput = (event) => {
    const inputElement = event.target;
    const name = inputElement.name;
    const value = inputElement.value;

    const newTaskData = { ...taskData };
    newTaskData[name] = value;
    console.log(newTaskData);
    setTaskData(newTaskData);
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    props.handleTasks(taskData);
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <label htmlFor="title">Title</label>
      <input
        name="title"
        type="text"
        value={taskData.title}
        onChange={handleTaskInput}
      ></input>
      <label htmlFor="description">Description</label>
      <input
        name="description"
        type="text"
        value={taskData.description}
        onChange={handleTaskInput}
      ></input>
      <input type="submit"></input>
    </form>
  );
};

TaskForm.propTypes = {
  handleTasks: PropTypes.func.isRequired,
};

export default TaskForm;
