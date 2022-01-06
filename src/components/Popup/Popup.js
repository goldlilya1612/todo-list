import React from "react";
import "./Popup.scss";

function Popup({ isAdd, setIsAdd }) {
    const closePopup = () => {
        setIsAdd(false);
    };

    return (
        <div className={`popup ${isAdd ? "" : "popup_inactive"}`}>
            <button
                onClick={closePopup}
                className="popup__close-button"
            ></button>
        </div>
    );
}

export default Popup;
