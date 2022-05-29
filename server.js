const express = require("express")
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbAdmin:lb63hneyWNalFZhj@cluster0.bsw1yaz.mongodb.net/?retryWrites=true&w=majority')

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.use(express.json());

app.get("/", async(req, res) => {
  res.send("Hello from todo-mongo!");
})