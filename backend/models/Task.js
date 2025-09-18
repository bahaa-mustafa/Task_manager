const mongoose = require("mongoose");


const taskSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    state: { type: Boolean, required:false, default: false }
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;