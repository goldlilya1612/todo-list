import React, { useState } from "react";
import Color from "../Color/Color";
import "./Popup.scss";

function Popup({ isAdd, setIsAdd, list }) {
    const [selectedColor, setSelectedColor] = useState("");

    const closePopup = () => {
        setIsAdd(false);
        setSelectedColor("");
    };

    return (
        <div className={`popup ${isAdd ? "" : "popup_inactive"}`}>
            <button
                onClick={closePopup}
                className="popup__close-button"
            ></button>
            <input
                className="popup__input"
                type="text"
                placeholder="Название папки"
            ></input>
            <ul className="popup__colors">
                {list.map((item) => (
                    <Color
                        color={item.name}
                        selectedColor={selectedColor}
                        key={item.id}
                        onClick={() => {
                            setSelectedColor(item.name);
                        }}
                    />
                ))}
            </ul>
            <button className="popup__add-button button">Добавить</button>
        </div>
    );
}

export default Popup;
