import React from "react";
import "./AddButton.scss";
import plus from "../../images/plus.svg";

function AddButton({setIsAdd}) {

    const isClicked = () => {
        setIsAdd(true);
    }

    return (
        <button onClick = {isClicked} className="todo__button">
        <img className="todo__button-icon" src={plus} alt="plus" />
        Добавить папку
    </button>
    );
}

export default AddButton;