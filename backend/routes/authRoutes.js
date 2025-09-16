const express = require("express");
const { registerUser, loginUser, getUsers, deletUser } = require("../controllers/authController")

const router = express.Router();

router.get("/users", getUsers)
router.delete("/users/:id", deletUser)
router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router;