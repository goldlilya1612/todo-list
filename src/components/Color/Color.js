import React from "react";
import "./Color.scss";

function Color({ color, selectedColor, onClick, isBig }) {
    return (
        <i
            onClick={onClick}
            className={`color color_big color_${color} ${
                isBig && color === selectedColor ? "color_big-active" : ""
            }`}
        ></i>
    );
}

export default Color;
