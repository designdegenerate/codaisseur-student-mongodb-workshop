const express = require("express")
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
const List = require("./models/List");
mongoose.connect('mongodb+srv://dbAdmin:lb63hneyWNalFZhj@cluster0.bsw1yaz.mongodb.net/?retryWrites=true&w=majority')

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.use(express.json());

app.get("/", async(req, res) => {
  res.send("Hello from todo-mongo!");
})

app.get("/lists", async(req, res) => {
  try {
    const getLists = await List.find();
    res.send(getLists);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
})

app.get("/lists/:user", async(req, res) => {
  try {
    const getList = await List.findOne({user: req.params.user});
    res.send(getList);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
})