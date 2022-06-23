import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onComplete, onDeleteTask }) => {
  const buttonClass = isComplete
    ? 'tasks__item__toggle--completed'
    : 'tasks__item__toggle';
  return (
    <li className="tasks__item">
      <button className={buttonClass} onClick={() => onComplete(id)}>
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => onDeleteTask(id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
