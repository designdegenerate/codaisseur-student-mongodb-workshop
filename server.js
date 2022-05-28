const express = require("express")
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.use(express.json());

app.get("/", async(req, res) => {
  res.send("Hello from todo-mongo!");
})