const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect(
  "mongodb+srv://dbAdmin:lb63hneyWNalFZhj@cluster0.bsw1yaz.mongodb.net/?retryWrites=true&w=majority"
);

const seedSomeUsers = async () => {
  try {
    const someUsers = await User.create(
      {
        name: "laurens",
        email: "laurens.am.spangenberg@gmail.com",
      },
      {
        name: "david",
        email: "david@david.com"
      }
    );
    console.log(someUsers);
    process.exit()
  } catch (error) {
    return console.log(error);
  }
};

seedSomeUsers();