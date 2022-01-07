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
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
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
        axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
            const newList = lists.filter((list) => list.id !== item.id);
            setLists(newList);
            setData(null);
        });
    };

    const handleEdit = ({ id }, title) => {
        const newList = lists.map((item) => {
            if (item.id === id) {
                item.name = title;
            }
            return item;
        });
        setLists(newList);
    };

    return (
        <div className="todo">
            <div className="todo__sidebar">
                {lists && lists.length !== 0 && (
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
                            onClickItem={(item) => {
                                setData(item);
                            }}
                            data={data}
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
                {lists && data ? (
                    <>
                        <TasksHeader data={data} handleEdit={handleEdit} />
                        {data.tasks.length !== 0 ? (
                            data.tasks.map((task) => (
                                <TaskItem key={task.id} task={task} />
                            ))
                        ) : (
                            <p className="todo__tasks_none">
                                Задачи отсутствуют
                            </p>
                        )}
                    </>
                ) : (
                    <div className="todo__tasks_none-wrapper">
                        <p className="todo__tasks_none">Задачи отсутствуют</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
