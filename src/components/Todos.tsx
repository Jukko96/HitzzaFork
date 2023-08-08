import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    console.log(`Access token: ${token}`);
    if (token) {
      console.log("true");
    } else {
      console.log("false");
      navigate("/");
    }

    axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setTodos(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  const handleTodoAdd = () => {
    const token = localStorage.getItem("access_token");

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
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  //   useEffect(() => {}, [handleTodoAdd]);
  console.log(todos);
  return (
    <div>
      Todos
      <input onChange={handleTodoChange} />
      <input type="button" value="추가하기" onClick={handleTodoAdd} />
      <ul>
        {todos.length <= 0
          ? "null"
          : todos.map(
              (
                item: {
                  id: Number;
                  isCompleted: boolean;
                  todo: String;
                  userId: Number;
                },
                index
              ) => <li key={index}>{item.todo}</li>
            )}
      </ul>
    </div>
  );
};

export default Todos;
