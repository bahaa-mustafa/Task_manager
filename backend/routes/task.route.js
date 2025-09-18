const express = require("express")
const {getAllTasks, creatTask, updateTask, deletTask} = require("../controllers/task.controller")

const router = express.Router();


router.post("/", getAllTasks);
router.post("/create", creatTask);
router.put("/update", updateTask);
router.delete("/delete", deletTask);


module.exports = router;