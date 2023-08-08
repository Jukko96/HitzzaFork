import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const token = localStorage.getItem("access_token");

  interface todoList {
    id: Number;
    isCompleted: boolean;
    todo: String;
    userId: Number;
  }
  const getTodoList = () => {
    axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        console.log("getTodo", data);
        setTodos(data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    console.log(`Access token: ${token}`);
    if (token) {
      console.log("true");
    } else {
      console.log("false");
      navigate("/");
    }
    getTodoList();
  }, []);

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  const handleTodoAdd = () => {
    axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        { todo },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => getTodoList())
      .catch((err) => console.log(err));
  };

  return (
    <div>
      Todos
      <input onChange={handleTodoChange} />
      <input type="button" value="추가하기" onClick={handleTodoAdd} />
      <ul>
        {todos.length <= 0
          ? "null"
          : todos.map((item: todoList, index) => (
              <li key={index}>{item.todo}</li>
            ))}
      </ul>
    </div>
  );
};

export default Todos;
