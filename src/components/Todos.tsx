import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const token = localStorage.getItem("access_token");
  const URL = "https://www.pre-onboarding-selection-task.shop";

  interface todoList {
    id: Number;
    isCompleted: boolean;
    todo: String;
    userId: Number;
  }

  const getTodoList = () => {
    axios
      .get(`${URL}/todos`, {
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
        `${URL}/todos`,
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
  const handleTodoDelete = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(`${URL}/todos/${e.currentTarget.dataset.id}`);
    axios
      .delete(`${URL}/todos/${e.currentTarget.dataset.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => getTodoList())
      .catch((err) => console.log(err));
  };
  const handleCompleteChange = (e: React.MouseEvent<HTMLInputElement>) => {
    // axios.put(`${URL}/todos/${e.currentTarget}`);
    console.log(e.currentTarget.checked);
  };
  return (
    <div>
      Todos
      <input onChange={handleTodoChange} />
      <input
        type="button"
        value="추가하기"
        onClick={handleTodoAdd}
        data-testid="new-todo-add-button"
      />
      <ul>
        {todos.length <= 0
          ? "null"
          : todos.map((item: todoList, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  onClick={handleCompleteChange}
                  data-id={item.id}
                  checked={item.isCompleted}
                />
                <span>{item.todo}</span>
                <input type="button" value="수정" />
                <input
                  type="button"
                  value="삭제"
                  onClick={handleTodoDelete}
                  data-id={item.id}
                  data-testid="new-todo-input"
                />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Todos;
