import React from "react";
import Color from "../Color/Color";
import "./TodoSection.scss";

function TodoSection({ items, isRemovable, onRemove, onClickItem, data }) {
    return (
        <>
            {items.map((item, index) => (
                <li
                    key={index}
                    className={`todo__list-item ${
                        data && item.id === data.id ? "active" : ""
                    }`}
                    onClick={() => onClickItem(item)}
                >
                    <div>
                        {item.icon ? (
                            <img alt="list icon" src={item.icon}></img>
                        ) : (
                            <Color color={item.colorId} />
                        )}
                    </div>
                    <p>{item.name}</p>
                    {isRemovable && (
                        <button
                            className="todo__remove-button"
                            onClick={() => onRemove(item)}
                        ></button>
                    )}
                </li>
            ))}
        </>
    );
}

export default TodoSection;
