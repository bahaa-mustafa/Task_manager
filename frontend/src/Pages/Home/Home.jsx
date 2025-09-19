
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Home.module.css";
import TaskItem from "../../Components/TaskItem";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const api_url = import.meta.env.VITE_API_URL;

  // get all tasks 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      axios.post(`${api_url}/tasks`, {
        user_id: `${localStorage.getItem("user_id")}`
      })
        .then((res) => setTasks(res.data))
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, []);

  // create new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    try {
      const res = await axios.post(`${api_url}/tasks/create`, {
        user_id: localStorage.getItem("user_id"),
        title: taskText,
      });

      if (res.status === 200) {
        setTasks((prevTasks) => [...prevTasks, res.data]);
      }

      setTaskText("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // update done / undo
  const toggleTask = async (id, currentDone) => {
    try {
      const res = await axios.put(`${api_url}/tasks/update`, {
        id,
        user_id: localStorage.getItem("user_id"),
        state: !currentDone,
      });

      if (res.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? res.data : task))
        );
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${api_url}/tasks/delete`, {
        data: { id, user_id: localStorage.getItem("user_id") },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // add description
  const addDescription = async (id, desc) => {
    if (desc !== null) {
      try {
        const res = await axios.put(`${api_url}/tasks/update`, {
          id,
          user_id: localStorage.getItem("user_id"),
          description: desc,
        });

        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? res.data : task))
        );
      } catch (err) {
        console.error("Error adding description:", err);
      }
    }
  };

  return (
    <section className={style.hero}>
      <h1 className={style.title}>Task Manager</h1>

      {!isLoggedIn ? (
        <p className={style.guestMsg}>
          Welcome! Please <Link to="/login">login</Link> to manage your tasks.
        </p>
      ) : (
        <>
          {/* Add Task Form */}
          <form className={style.form} onSubmit={handleAddTask}>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Enter new task..."
              className={style.input}
            />
            <button type="submit" className={style.addBtn}>
              + Add Task
            </button>
          </form>

          {/* Task List */}
          <div className={style.taskList}>
            {tasks.length === 0 ? (
              <p className={style.noTask}>No tasks yet. Start by adding one!</p>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  addDescription={addDescription}
                  style={style}
                />
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
