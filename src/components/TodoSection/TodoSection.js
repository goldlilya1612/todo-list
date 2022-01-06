import React from "react";
import Color from "../Color/Color";
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
                            <Color color={item.color} />
                        )}
                    </div>
                    <p>{item.text}</p>
                </li>
            ))}
        </>
    );
}

export default TodoSection;
