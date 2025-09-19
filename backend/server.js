const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const connecDB = require("./config/db")
const authRoute = require("./routes/authRoutes")
const taskRoute = require("./routes/task.route")
const morgan = require("morgan")



dotenv.config();

const app = express()
const port = process.env.PORT || 3000;


app.use(morgan("tiny"))
app.use(cors()); //learn here
app.use(express.json());
connecDB();



app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1><h2>Welcome to task manager app!</h2>')
})
app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);

app.listen(port, () => {
    console.log(`Task Manager app listening on port ${port}`)
})
