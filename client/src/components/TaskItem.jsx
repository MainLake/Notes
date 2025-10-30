import React from 'react';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        task.completed ? 'list-group-item-success' : ''
      }`}
    >
      <div>
        <h5 className={`mb-1 ${task.completed ? 'text-decoration-line-through' : ''}`}>
          {task.title}
        </h5>
        <p className="mb-1 text-muted">{task.description}</p>
      </div>
      <div className="d-flex align-items-center">
        <div className="form-check me-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id, !task.completed)}
            title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
          />
        </div>
        <button onClick={() => onDelete(task.id)} className="btn btn-danger btn-sm">
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
