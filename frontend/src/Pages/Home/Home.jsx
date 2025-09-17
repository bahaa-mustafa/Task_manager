

import { useState, useEffect } from "react";
import style from "./Home.module.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      description: "",
      done: false,
    };

    setTasks([newTask, ...tasks]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addDescription = (id) => {
    const desc = prompt("Enter description for this task:");
    if (desc !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, description: desc } : task
        )
      );
    }
  };

  return (
    <section className={style.hero}>
      <h1 className={style.title}>Task Manager</h1>
      {!isLoggedIn ? (
        <p className={style.guestMsg}>
          Welcome! Please <a href="/login">login</a> to manage your tasks.
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
                <div
                  key={task.id}
                  className={`${style.task} ${task.done ? style.done : ""}`}
                >
                  <div className={style.taskContent}>
                    <span className={style.taskTitle}>{task.text}</span>
                    {task.description && (
                      <p className={style.taskDesc}>{task.description}</p>
                    )}
                  </div>

                  <div className={style.actions}>
                    <button
                      className={style.descBtn}
                      onClick={() => addDescription(task.id)}
                    >
                      📝
                    </button>
                    <button
                      className={style.doneBtn}
                      onClick={() => toggleTask(task.id)}
                    >
                      {task.done ? "↩ Undo" : "✅ Done"}
                    </button>
                    <button
                      className={style.deleteBtn}
                      onClick={() => deleteTask(task.id)}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
