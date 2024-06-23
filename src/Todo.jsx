import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Todo() {
    let [todos, setTodos] = useState([{ task: "sample task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
        });
        setNewTodo("");
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    let UpperCaseAll = () => {
        setTodos((prevTodos) => prevTodos.map((todo) => {
            return {
                ...todo,
                task: todo.task.toUpperCase(),
            };
        }));
    };

    let upperCaseOne = (id) => {
        setTodos((prevTodos) => prevTodos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    task: todo.task.toUpperCase(),
                };
            }
            return todo;
        }));
    };

    let toggleDone = (id) => {
        setTodos((prevTodos) => prevTodos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isDone: !todo.isDone,
                };
            }
            return todo;
        }));
    };

    return (
        <div>
            <input
                placeholder="add task"
                value={newTodo}
                onChange={updateTodoValue}
            />
            <br />
            <button onClick={addNewTask}>Add Task</button>
            <br /><br /><hr />
            <h4>Tasks Todo</h4>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ textDecoration: todo.isDone ? 'line-through' : 'none', lineHeight: '1.5', fontSize: '16px' }}>
                        <span>{todo.task}</span>
                        &nbsp; &nbsp; &nbsp;
                        <button onClick={() => toggleDone(todo.id)}>
                            {todo.isDone ? 'Undo' : 'Mark as Done'}
                        </button>
                        &nbsp;
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        &nbsp;
                        <button onClick={() => upperCaseOne(todo.id)}>UpperCase</button>
                    </li>
                ))}
            </ul>
            <button onClick={UpperCaseAll}>UpperCase All</button>
        </div>
    );
}
