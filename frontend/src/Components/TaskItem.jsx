import { useState } from "react";
// import "./TaskItem.css"

function TaskItem({ task, toggleTask, deleteTask, addDescription, style }) {
    const [showInput, setShowInput] = useState(false);
    const [desc, setDesc] = useState("");

    const handleAddDesc = () => {
        if (desc.trim()) {
            addDescription(task._id, desc);
            setDesc("");
            setShowInput(false);
        }
    };

    return (
        <div className={`${style.task} ${task.state ? style.done : ""}`}>
            <div className={style.taskContent}>
                <span className={style.taskTitle}>{task.title}</span>

                {task.description && (
                    <p className={style.taskDesc}>{task.description}</p>
                )}

                {showInput && (
                    <div className={style.editSection}>
                        <input
                            type="text"
                            placeholder={"Enter description..."}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <div className={style.btn}>
                            <button onClick={handleAddDesc}>Save</button>
                            <button onClick={() => setShowInput(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            <div className={style.actions}>
                <button
                    className={style.descBtn}
                    onClick={() => setShowInput(!showInput)}
                >
                    📝
                </button>
                <button
                    className={style.doneBtn}
                    onClick={() => toggleTask(task._id, task.state)}
                >
                    {task.state ? "↩ Undo" : "✅ Done"}
                </button>
                <button
                    className={style.deleteBtn}
                    onClick={() => deleteTask(task._id)}
                >
                    ❌
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
