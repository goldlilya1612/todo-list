import React from "react";
import TodoSection from "./components/TodoSection/TodoSection.js";
import listSvg from "./images/Vector.svg";
import plus from "./images/plus.svg";

function App() {
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
                    ></TodoSection>
                    {/*
                    <TodoSection text="Покупки" vector={vector2}></TodoSection>
                    <TodoSection text="Фронтенд" vector={vector2}></TodoSection>
                    <TodoSection
                        text="Фильмы и сериалы"
                        vector={vector2}
                    ></TodoSection>
                    <TodoSection text="Книги" vector={vector2}></TodoSection>
                    <TodoSection text="Личное" vector={vector2}></TodoSection>
                   */}
                </ul>
                <button className="todo__button">
                    <img className="todo__button-icon" src={plus} alt="plus" />
                    Добавить папку
                </button>
            </div>
            <div className="todo__tasks"></div>
        </div>
    );
}

export default App;
