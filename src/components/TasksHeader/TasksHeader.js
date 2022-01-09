import React from "react";
import "./TasksHeader.scss";
import axios from "axios";

function TasksHeader({ data, handleEdit }) {
    const onEdit = () => {
        const newTitle = window.prompt("Введите название списка", data.name);
        if (newTitle) {
            handleEdit(data, newTitle);
            axios
                .patch("http://localhost:3001/lists/" + data.id, {
                    name: newTitle,
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="todo__tasks-wrapper">
            <h1
                className={`todo__tasks-header todo__tasks-header_${data.colorId}`}
            >
                {data.name}
            </h1>
            <button onClick={onEdit} className="todo__edit-button"></button>
        </div>
    );
}

export default TasksHeader;
