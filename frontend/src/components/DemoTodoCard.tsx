import React from 'react';
import { todo } from '../types';

const DemoTodoCard = (props: todo) => {
  const { id, title, completed } = props;
  return (
    <div className="todo-card">
      <h3>id: {id}</h3>
      <h4>completed: {completed.toString()}</h4>
      <p>{title}</p>
    </div>
  );
};

export default DemoTodoCard;
