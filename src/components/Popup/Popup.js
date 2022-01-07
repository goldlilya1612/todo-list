import React, { useState } from "react";
import Color from "../Color/Color";
import "./Popup.scss";

function Popup({ isAdd, setIsAdd, list, addItem }) {
    const [selectedColor, setSelectedColor] = useState("");
    const [inputValue, setInputValue] = useState("");

    const closePopup = () => {
        setIsAdd(false);
        setSelectedColor("");
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddClick = () => {
        addItem(inputValue, selectedColor);
        setInputValue("");
        setSelectedColor("");
    };

    return (
        <div className={`popup ${isAdd ? "" : "popup_inactive"}`}>
            <button
                onClick={closePopup}
                className="popup__close-button"
            ></button>
            <input
                onChange={handleChange}
                className="popup__input"
                type="text"
                placeholder="Название папки"
                value={inputValue}
            ></input>
            <ul className="popup__colors">
                {list.map((item) => (
                    <Color
                        color={item.name}
                        selectedColor={selectedColor}
                        key={item.id}
                        isBig={true}
                        onClick={() => {
                            setSelectedColor(item.name);
                        }}
                    />
                ))}
            </ul>
            <button
                className="popup__add-button button"
                onClick={handleAddClick}
            >
                Добавить
            </button>
        </div>
    );
}

export default Popup;
