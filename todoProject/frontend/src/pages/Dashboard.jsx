import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../styles/Dashboard.css';
const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");
  const loadTodos = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Todos from API:", res.data); // Debug
    setTodos(res.data);

  } catch (err) {
    console.log("Load Error:", err.response?.data || err.message);
  }
};

const addTodo = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/todos",
      { text:title }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTitle("");
    loadTodos();
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};
  useEffect(() => { loadTodos(); }, []);

 const toggleTodo = async (id) => {
    try {

      await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      loadTodos();
      

    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {

      await axios.delete(
        `http://localhost:5000/api/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadTodos();

    } catch (err) {
      console.log(err);
    }
  };

  return (
  <>
    <div className="dashContainer">
      <h2 className="title3">My Todos</h2>
      <form className="dashForm" onSubmit={(e) => { 
          e.preventDefault();
          addTodo();
        }}>

      <input
          className="input1"
          placeholder="New Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      <button className="input1" type="submit">
          Add
        </button>

      </form>

    </div>

    <div className="totalresult">

      <ul className="todo-list">

        {todos.length === 0 && <p>No Todos Found</p>}

        {todos.map((todo) => (

          <li
            key={todo._id}
            className={todo.completed ? "done" : ""}
          >

            <span onClick={() => toggleTodo(todo._id)}>
              {todo.text}
            </span>

            <button onClick={() => deleteTodo(todo._id)}>
              ❌
            </button>

          </li>

        ))}

      </ul>

    </div>
  </>
);

};

export default Dashboard;

