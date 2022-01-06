import React from "react";
import "./TodoSection.scss";

function TodoSection({ items, isRemovable }) {
    return (
        <>
            {items.map((item, index) => (
                <li key={index} className={item.active ? "active" : ""}>
                    <div>
                        {item.icon ? (
                            <img alt="list icon" src={item.icon}></img>
                        ) : (
                            <i className={`color color_${item.color}`}></i>
                        )}
                    </div>
                    <p>{item.text}</p>
                </li>
            ))}
        </>
    );
}

export default TodoSection;
