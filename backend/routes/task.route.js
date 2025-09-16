const express = require("express")
const {getAllTasks, creatTask, updateTask, deletTask} = require("../controllers/task.controller")

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", creatTask);
router.put("/", updateTask);
router.delete("/", deletTask);


module.exports = router;