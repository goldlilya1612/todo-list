import React from "react";
import AddButton from "./components/AddButton/AddButton.jsx";
import Popup from "./components/Popup/Popup.js";
import TodoSection from "./components/TodoSection/TodoSection.js";
import listSvg from "./images/Vector.svg";

function App() {
    const [isAdd, setIsAdd] = React.useState(false);

    return (
        <div className="todo">
            <div className="todo__sidebar">
                <ul className="todo__list">
                    <TodoSection
                        items={[
                            {
                                icon: listSvg,
                                text: "Все задачи",
                                active: true,
                            },
                            {
                                color: "2",
                                text: "Покупки",
                            },
                            {
                                color: "3",
                                text: "Фронтентд",
                            },
                            {
                                color: "4",
                                text: "Фильмы и сериалы",
                            },
                            {
                                color: "5",
                                text: "Книги",
                            },
                            {
                                color: "1",
                                text: "Личное",
                            },
                        ]}
                        isRemovable={true}
                    ></TodoSection>
                </ul>
                <AddButton setIsAdd={setIsAdd} />
                <Popup isAdd={isAdd} setIsAdd={setIsAdd} />
            </div>
            <div className="todo__tasks"></div>
        </div>
    );
}

export default App;
