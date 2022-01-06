import React from "react";
import "./TodoSection.scss";

function TodoSection({ items }) {
    return (
        <>
            {items.map((item) => (
                <li className={item.active ? "active" : ""}>
                    {/*className="active"*/}
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
