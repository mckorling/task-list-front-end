import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete }) => {
  const [complete, setComplete] = useState(isComplete);
  const buttonClass = complete
    ? 'tasks__item__toggle--completed'
    : 'tasks__item__toggle';

  return (
    <li className="tasks__item">
      <button className={buttonClass} onClick={() => setComplete(!complete)}>
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
};

export default Task;
