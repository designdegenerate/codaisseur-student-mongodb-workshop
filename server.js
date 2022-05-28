const express = require("express")
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.get("/", async(req, res) => {
  res.send("Hello from todo-mongo!");
})