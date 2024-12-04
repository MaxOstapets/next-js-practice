"use client";
import React, { useReducer, useState } from "react";

interface IState {
    list: { id: number; task: string; isComplete: boolean; score: number }[];
    userName: string;
    allScore: number;
}

enum Action {
    addTask = "addTask",
    completeTask = "completeTask",
}

interface IAction {
    type: Action;
    payload?: any;
}

const initialList: IState = {
    list: [],
    userName: "",
    allScore: 0,
};

const reducer = (state: IState, action: IAction): IState => {
    const { type, payload } = action;
    switch (type) {
        case Action.addTask:
            return {
                ...state,
                list: [...state.list, ...payload],
            };
        case Action.completeTask:
            return {
                ...state,
                list: state.list.filter((el) => el.id !== payload),
            };
        default:
            return state;
    }
};

const List = () => {
    const [state, dispatch] = useReducer(reducer, initialList);
    const [task, setTask] = useState("");

    const addTask = () => {
        if (task.trim()) {
            dispatch({
                type: Action.addTask,
                payload: [{ id: Date.now(), task, isComplete: false, score: 0 }],
            });
            setTask("");
        }
    };

    return (
        <section className="flex justify-center items-center flex-col gap-5">
            <span className="text-7xl">Name: </span>
            <div className="flex justify-center items-center flex-col ">
                <p className="text-6xl">Your score: {state.allScore}</p>
                <p className="text-6xl">Your tasks:</p>
                <ul className="flex justify-center items-center flex-col gap-1 text-4xl">
                    {state.list.map((el) => (
                        <li key={el.id}>
                            <span>{el.task}</span>
                            <input
                                type="checkbox"
                                onChange={() => dispatch({ type: Action.completeTask, payload: el.id })}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="task"
                    className="w-96 h-10 border-2 text-2xl p-2 border-black"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
            </div>
            <button
                className="w-96 h-10 border-2 text-2xl border-black font-bold"
                onClick={addTask}
            >
                Add task
            </button>
        </section>
    );
};

export default List;
