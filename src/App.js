import React from "react";
import AddButton from "./components/AddButton/AddButton.jsx";
import Popup from "./components/Popup/Popup.js";
import TodoSection from "./components/TodoSection/TodoSection.js";
import listSvg from "./images/Vector.svg";

import DB from "./db.json";

function App() {
    const [isAdd, setIsAdd] = React.useState(false);
    const [lists, setLists] = React.useState([]);

    const addFolder = (inputValue, selectedColor) => {
        const newData = {
            id: DB.lists.length + 1,
            name: inputValue,
            colorId: selectedColor,
        };
        const newList = [...lists, newData];
        setLists(newList);
    };

    return (
        <div className="todo">
            <div className="todo__sidebar">
                {lists.length !== 0 && (
                    <ul className="todo__list">
                        <TodoSection
                            items={[
                                {
                                    icon: listSvg,
                                    name: "Все задачи",
                                    active: true,
                                },
                            ]}
                            isRemovable={true}
                        ></TodoSection>
                        <TodoSection
                            items={lists}
                            isRemovable={true}
                        ></TodoSection>
                    </ul>
                )}

                <AddButton setIsAdd={setIsAdd} />
                <Popup
                    isAdd={isAdd}
                    setIsAdd={setIsAdd}
                    list={DB.colors}
                    addItem={addFolder}
                />
            </div>
            <div className="todo__tasks"></div>
        </div>
    );
}

export default App;
