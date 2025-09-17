const express = require("express");
const { registerUser, loginUser, deletUser, getUser } = require("../controllers/authController")

const router = express.Router();

// router.get("/users", getUsers)
router.get("/user", getUser)
// router.put("/user", updateUser)
router.delete("/users/:id", deletUser)
router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router;