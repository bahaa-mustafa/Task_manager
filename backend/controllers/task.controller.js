
const Task = require("../models/Task")

const getAllTasks = async (req, res) => {
    // console.log(`req for all tasks: ${req.body}`);

    try {
        const { user_id } = req.body;
        // console.log( "user id: ",user_id);

        const tasks = await Task.find({ user_id });
        // console.log(tasks);
        res.send(tasks)
    } catch (err) {
        console.log(`error in get all tasks as: ${err}`);

        res.status(204).json({ message: `Error in getting data ${err}` })
    }

}

const creatTask = async (req, res) => {
    try {
        const { user_id, title, description, state } = req.body;
        if (await Task.findOne({ user_id })) {
            const task = await Task.create({ user_id, title, description, state });
            console.log(`task: ${task}`);
            res.status(200).json(task)
        } else {
            const task = await Task.create({ user_id, title, description, state });
            console.log(`task: ${task}`);
            res.status(200).json(task)
        }

    } catch (err) {
        console.log(`error in create task as: ${err}`);
        res.status(204).json({ message: `Error ${err}` })
    }
}

const updateTask = async (req, res) => {
    console.log(`updated data: ${req.body.state}`);

    try {
        const { id, user_id, title, description, state } = req.body;

        const task = await Task.findOne({ _id: id, user_id });

        if (!task) {
            return res.status(204).json({ message: "Task not found or not authorized" });
        }

        console.log(`task before: ${task}`);

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, state },
            { new: true }
        );

        console.log("task updated:", updatedTask);

        res.status(200).json(updatedTask);
        
    } catch (err) {
        console.log(`error in update task as: ${err}`);

        res.status(204).json({ message: `error in updateing: ${err}` })
    }
}

const deletTask = async (req, res) => {
    try {
        const { id, user_id } = req.body;
        const task = await Task.findById(id);
        if (task.user_id == user_id) {
            await task.deleteOne()
            res.status(200).json({ message: "task deleted!" })
        } else {
            res.status(204).json({ message: "task can not deleted!" })
        }
    } catch (err) {
        console.log(`error in delet task as: ${err}`);

        res.status(204).json({ message: `error in delete task: ${err}` })
    }
}

module.exports = { getAllTasks, creatTask, updateTask, deletTask }