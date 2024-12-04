"use client";
import React, { useReducer, useState } from "react";
import { BiCheck } from "react-icons/bi";

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
        <section className="flex justify-around gap-5 mt-24">
           
            <div className="flex flex-col gap-8 bg-blue-900 p-6 text-blue-900 rounded-lg h-72">
                <ul className="flex flex-col gap-1 text-white">
                    <li className="text-5xl">Name: </li>
                    <li className="text-4xl">Your score: {state.allScore}</li>
                </ul>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                        <input
                            type="text"
                            placeholder="Write your task"
                            className="w-96 h-10 border-2 text-xl p-2 border-white"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                        <button
                            className="w-10 h-10 border-2 text-2xl border-white bg-white"
                            onClick={addTask}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex gap-1">
                        <input
                            type="text"
                            placeholder="Write your name"
                            className="w-96 h-10 border-2 text-xl p-2 border-white"
                        />
                        <button className="flex justify-center items-center w-10 h-10 border-2 text-2xl border-white bg-white">
                            <BiCheck />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center flex-col bg-blue-900 h-96 snap-y w-1/3">
                <p className="text-5xl text-white">Your tasks:</p>
                <ul className="flex justify-center items-center flex-col gap-1 text-2xl">
                    {state.list.map((el) => (
                        <li key={el.id} className="w-80 bg-white flex justify-between px-2 items-center">
                            <span>{el.task}</span>
                            <input
                                type="checkbox"
                                onChange={() => dispatch({ type: Action.completeTask, payload: el.id })}
                            />
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    );
};

export default List;
