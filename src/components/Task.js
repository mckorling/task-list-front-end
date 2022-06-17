import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onComplete }) => {
  //const [complete, setComplete] = useState(isComplete);

  // const toggleComplete = () => {
  //   onComplete(id);
  // };

  const buttonClass = isComplete
    ? 'tasks__item__toggle--completed'
    : 'tasks__item__toggle';

  return (
    <li className="tasks__item">
      <button className={buttonClass} onClick={() => onComplete(id)}>
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Task;
