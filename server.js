const express = require("express")
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
const List = require("./models/List");
const User = require("./models/User");
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

app.get("/lists/:owner", async(req, res) => {
  try {
    const getList = await List.findOne({owner: req.params.owner}).populate("user");
    res.send(getList);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
})

app.patch("/lists/:owner/:index", async(req, res) => {
  try {
    const index = req.params.index;
    const getList = await List.findOne({owner: req.params.owner}).populate("user");
    
    getList.items[index].title = req.body.title;
    getList.save();

    res.send(getList);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
})

app.delete("/lists/:owner", async(req, res) => {
  try {
    const deleteList = await List.deleteOne({owner: req.params.owner});
    res.send(deleteList);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
})

app.post("/user", async(req, res) => {
  try {
    const {name, email} = req.body;
    const newUser = await User.create({
      name: name,
      email: email
    })
    res.send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong")
  }
})