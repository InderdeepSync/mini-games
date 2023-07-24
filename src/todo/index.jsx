import styled from "styled-components";

const TodoHeader = ({currentTodos, allTodos}) => {
    return (
        <header>
            <h1>Todos</h1>
            <p>
                Completed: {currentTodos}/{allTodos}
            </p>
        </header>
    );
};

import React, {useEffect, useState} from "react";
import {FiDelete} from "react-icons/fi";
import {IoMdAdd} from "react-icons/io";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {IoReturnUpBackOutline} from "react-icons/io5";

const StyledSection = styled.section`
  min-width: 350px;
  margin: 20px auto;
  border: 2px solid black;
  padding: 20px;
  border-radius: 10px;

  & header {
    display: flex;
    justify-content: space-between;
    padding: 10px 0px 20px;
    align-items: center;
  }

  & .input {
    display: flex;
    flex-direction: row-reverse;
    background-color: #e0e0e0;
    padding-block: 5px;
  }

  & .input input {
    width: 100%;
    border: none;
    padding: 5px 10px;
    background: #e0e0e0;
    border-radius: 5px;
  }

  & .input input:focus {
    outline: none;
  }

  & .input button {
    background-color: transparent;
    border: none;
    border-right: 1px solid white;
    padding-right: 5px;
    font-size: 30px;
    display: grid;
    place-content: center;
    color: black;
    cursor: pointer;
  }

  & ul {
    list-style-type: none;
    padding: 10px 5px;
  }

  & ul li {
    border-bottom: 1px solid gainsboro;
    padding-block-end: 8px;
    display: flex;
    align-items: center;
  }

  & ul li button {
    padding: 4px;
    display: flex;
    align-items: center;
    background-color: transparent;
    margin-left: auto;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: rgba(255, 0, 0, 0.549);
  }

  & ul li span {
    word-break: break-all;
  }

  & ul li #checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: relative;
    top: 5px;
    margin-right: 10px;
  }

  & ul li .completed {
    text-decoration: underline;
    text-underline-offset: -.4em;
    text-decoration-skip-ink: none;
    text-decoration-color: red;
    text-decoration-thickness: 2px;
  }
`

const TodoList = () => {
    const [todos, setTodos] = useState(() => {
        // get todos stored in localstorage
        const localValue = localStorage.getItem("todosData");
        if (localValue == null) return [];
        return JSON.parse(localValue);
    });
    useEffect(() => {
        localStorage.setItem("todosData", JSON.stringify(todos));
    }, [todos]);

    const [inputValue, setInputValue] = useState("");
    // handling the input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // handling the add todo button
    const handleAddTodo = () => {
        if (inputValue.trim() === "") {
            return;
        }
        setTodos((currentTodos) => {
            return [
                ...currentTodos,
                {id: Math.random() * 1234, text: inputValue, completed: false},
            ];
        });
        setInputValue("");
    };

    // to delete a todo we filter the array without the selected id
    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        // we add the new todo list to the state
        setTodos(updatedTodos);
        localStorage.setItem("todosData", JSON.stringify(updatedTodos));
    };
    const toggleTodo = (id, completed) => {
        setTodos((currentTodos) => {
            return currentTodos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, completed};
                }
                return todo;
            });
        });
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddTodo();
        }
    };

    const filteredTodos = todos
        ? todos.filter((todo) => todo.completed !== false)
        : [];
    return (
        <>
            <Helmet>
                <title>Todos React App</title>
            </Helmet>
            <div className="go-back">
                <Link to="/"><IoReturnUpBackOutline/> Go Back</Link>
            </div>
            <StyledSection id="todoList">
                <TodoHeader currentTodos={filteredTodos.length} allTodos={todos.length}/>
                <div className="input">
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={inputValue}
                        name="input"
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleAddTodo}>
                        <IoMdAdd/>
                    </button>
                </div>
                <ul>
                    {todos.length === 0 && (
                        <li
                            style={{
                                textAlign: "center",
                                display: "block",
                                padding: "5px 0 10px",
                                borderBottom: "1px solid gainsboro",
                            }}
                        >
                            Add your first todo {":)"}
                        </li>
                    )}
                    {todos.map((todo, index) => (
                        <li key={index}>
                        <span className={todo.completed ? "completed" : ""}>
                          <input
                              id="checkbox"
                              type="checkbox"
                              checked={todo.completed}
                              onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                          />
                            {todo.text}
                        </span>
                            <button
                                className="danger"
                                onClick={() => handleDeleteTodo(todo.id)}
                            >
                                <FiDelete/>
                            </button>
                        </li>
                    ))}
                </ul>
            </StyledSection>
        </>
    );
};

export default TodoList;