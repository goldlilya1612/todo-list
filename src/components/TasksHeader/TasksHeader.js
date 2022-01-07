import React from "react";
import "./TasksHeader.scss";

function TasksHeader({ isActive }) {
    return (
        <div className="todo__tasks-wrapper">
            <h1 className="todo__tasks-header">Фронтенд</h1>
            {isActive && <button className="todo__edit-button"></button>}
        </div>
    );
}

export default TasksHeader;
