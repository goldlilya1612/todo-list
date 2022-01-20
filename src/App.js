import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";
import {
    AddButton,
    Popup,
    TodoSection,
    TasksHeader,
    TaskItem,
    Form,
} from "./components/components";
import listSvg from "./images/Vector.svg";

function App() {
    const [isAdd, setIsAdd] = useState(false);
    const [isAddTask, setIsAddTask] = useState(false);
    const [lists, setLists] = useState([]);
    const [colors, setColors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [isAllTasks, setIsAllTasks] = useState(false);

    let history = useHistory();

    useEffect(() => {
        axios
            .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
            .then(({ data }) => {
                setLists(data);
            })
            .catch((err) => console.log(err));
        axios
            .get("http://localhost:3001/colors")
            .then(({ data }) => setColors(data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (lists) {
            if (history.location.pathname.split("/")[1] === "") {
                setIsAllTasks(true);
            } else {
                setIsAllTasks(false);
                const listId = history.location.pathname.split("lists/")[1];
                const list = lists.find((list) => list.id === Number(listId));
                setData(list);
            }
        }
    }, [lists, isAllTasks, history.location.pathname]);

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

    const addTask = (listId, taskObj) => {
        const newList = lists.map((item) => {
            if (item.id === listId) {
                item.tasks = [...item.tasks, taskObj];
            }
            return item;
        });
        setLists(newList);
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

    //TODO: когда удаляешь папку, находясь в ней (именно находясь в ней!!!) -- редирект на главную

    return (
        <div className="todo">
            <div className="todo__sidebar">
                {lists && lists.length > 0 && (
                    <ul className="todo__list">
                        <TodoSection
                            items={[
                                {
                                    icon: listSvg,
                                    name: "Все задачи",
                                },
                            ]}
                            onClickItem={(item) => {
                                setIsAllTasks(true);
                                setData(item);
                                setIsAddTask(false);
                                history.push(`/`);
                            }}
                        ></TodoSection>
                        <TodoSection
                            items={lists}
                            isRemovable={true}
                            onRemove={onRemove}
                            onClickItem={(item) => {
                                setData(item);
                                setIsAddTask(false);
                                history.push(`/lists/${item.id}`);
                            }}
                            data={data}
                        ></TodoSection>
                    </ul>
                )}
                <AddButton setIsAdd={setIsAdd} text="Добавить папку" />
                <Popup
                    isAdd={isAdd}
                    setIsAdd={setIsAdd}
                    list={colors}
                    addItem={addFolder}
                    isLoading={isLoading}
                />
            </div>
            <div className="todo__tasks">
                <Route exact path="/">
                    {lists.map((list) => (
                        <div key={list.id}>
                            {list &&
                                list.tasks.length !== 0 &&
                                list.length !== 0 && (
                                    <>
                                        <TasksHeader
                                            withoutButton={true}
                                            data={list}
                                            handleEdit={handleEdit}
                                        />
                                        {list.tasks.map((task) => (
                                            <TaskItem
                                                key={task.id}
                                                task={task}
                                            />
                                        ))}
                                    </>
                                )}
                        </div>
                    ))}
                </Route>
                {lists && !isAllTasks && (
                    <>
                        {data && (
                            <TasksHeader data={data} handleEdit={handleEdit} />
                        )}
                        {data && data.tasks.length > 0 ? (
                            data.tasks.map((task) => (
                                <TaskItem key={task.id} task={task} />
                            ))
                        ) : (
                            <p className="todo__tasks_none">
                                Задачи отсутствуют
                            </p>
                        )}
                        {isAddTask ? (
                            <Form
                                addTask={addTask}
                                setIsAddTask={setIsAddTask}
                                data={data}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                            />
                        ) : (
                            <AddButton
                                setIsAdd={setIsAddTask}
                                isAddTask={isAddTask}
                                text="Добавить задачу"
                            />
                        )}
                    </>
                )}
                {lists.length === 0 && <h1> hi </h1>}
            </div>
        </div>
    );
}

export default App;
