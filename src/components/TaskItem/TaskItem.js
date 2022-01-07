import React from "react";
import "./TaskItem.scss";

function TaskItem() {
    const handleChange = (e) => {
        console.log(e.target.value);
    };

    return (
        <div className="todo__task-item">
            <div className="checkbox">
                <input id="check1" type="checkbox"></input>
                <label htmlFor="check1">
                    <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                            stroke="#000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>
            </div>
            <input
                onChange={handleChange}
                type="text"
                value="Изучить JavaScript"
                className="checkbox__label"
            ></input>
        </div>
    );
}

export default TaskItem;
