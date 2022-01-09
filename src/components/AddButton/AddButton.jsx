import React from "react";
import "./AddButton.scss";
import plus from "../../images/plus.svg";

function AddButton({setIsAdd, text, IsAddTask}) {

    const isClicked = () => {
            setIsAdd(true);    
    }

    return (
        <button onClick = {isClicked} className={`todo__button ${text === "Добавить задачу" ? 'todo__button_task': ''}`}>
        <img className="todo__button-icon" src={plus} alt="plus" />
        {text}
    </button>
    );
}

export default AddButton;