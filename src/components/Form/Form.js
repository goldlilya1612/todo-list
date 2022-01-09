import React from "react";
import { useState } from "react/cjs/react.development";
import axios from "axios";
import "./Form.scss";

function Form({ setIsAddTask, addTask, data, isLoading, setIsLoading }) {
    const [dataInput, setDataInput] = useState(null);

    const onCloseClick = () => {
        setIsAddTask(false);
    };

    const onAddClick = (e) => {
        setIsLoading(true);
        e.preventDefault();
        const obj = {
            listId: data.id,
            text: dataInput,
            completed: false,
        };
        axios
            .post("http://localhost:3001/tasks", obj)
            .then((res) => {
                addTask(data.id, res.data);
                onCloseClick();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleChange = (e) => {
        setDataInput(e.target.value);
    };

    return (
        <form className="form">
            <input
                onChange={handleChange}
                className="form__input"
                placeholder="Текст задачи"
            ></input>
            <div className="form__button-wrapper">
                <button
                    onClick={onAddClick}
                    className="form__add-button button"
                >
                    {isLoading ? "Добавление..." : "Добавить задачу"}
                </button>
                <button
                    onClick={onCloseClick}
                    className="form__close-button button"
                >
                    Отмена
                </button>
            </div>
        </form>
    );
}

export default Form;
