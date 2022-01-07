import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    AddButton,
    Popup,
    TodoSection,
    TasksHeader,
    TaskItem,
} from "./components/components";
import listSvg from "./images/Vector.svg";

function App() {
    const [isAdd, setIsAdd] = useState(false);
    const [lists, setLists] = useState([]);
    const [colors, setColors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isActive = true;

    useEffect(() => {
        axios
            .get("http://localhost:3001/lists?_expand=color")
            .then(({ data }) => setLists(data))
            .catch((err) => console.log(err));
        axios
            .get("http://localhost:3001/colors")
            .then(({ data }) => setColors(data))
            .catch((err) => console.log(err));
    }, []);

    const addFolder = (inputValue, selectedColor, closePopup) => {
        setIsLoading(true);
        const newData = {
            id: lists.length + 1,
            name: inputValue,
            colorId: selectedColor,
        };
        axios
            .post("http://localhost:3001/lists", newData)
            .then(({ data }) => {
                const newList = [...lists, data];
                setLists(newList);
                closePopup();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onRemove = (item) => {
        console.log(item);
        axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
            const newList = lists.filter((list) => list.id !== item.id);
            setLists(newList);
        });
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
                                },
                            ]}
                        ></TodoSection>
                        <TodoSection
                            items={lists}
                            isRemovable={true}
                            onRemove={onRemove}
                        ></TodoSection>
                    </ul>
                )}
                <AddButton setIsAdd={setIsAdd} />
                <Popup
                    isAdd={isAdd}
                    setIsAdd={setIsAdd}
                    list={colors}
                    addItem={addFolder}
                    isLoading={isLoading}
                />
            </div>
            <div className="todo__tasks">
                <TasksHeader isActive={isActive} />
                <TaskItem />
            </div>
        </div>
    );
}

export default App;
