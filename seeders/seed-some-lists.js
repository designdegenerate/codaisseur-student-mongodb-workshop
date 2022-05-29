const mongoose = require("mongoose");
const List = require("../models/List");
const User = require("../models/User");

mongoose.connect(
  "mongodb+srv://dbAdmin:lb63hneyWNalFZhj@cluster0.bsw1yaz.mongodb.net/?retryWrites=true&w=majority"
);

// This is a very ugly way of doing
// it and just shown as a quick and 
// dirty example

const seedSomeListsAndUsers = async () => {
  try {
    const firstUser = await User.create({
      name: "laurens",
      email: "laurens.am.spangenberg@gmail.com",
    });

    const secondUser = await User.create({
      name: "david",
      email: "david@david.com"
    });

    const firstList = await List.create({
      owner: "laurens",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: firstUser._id,
      items: [
        {
          title: "get the milk",
          description: "from the store",
          completed: false,
        },
        {
          title: "finish this workshop",
          description: "what am I doing with my weekend",
          completed: false,
        },
      ],
    });

    const secondList = await List.create({
      owner: "david",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: secondUser._id,
      items: [
        {
          title: "teach styled components",
          description: "because they're great",
          completed: false,
        },
        {
          title: "refill the coffee",
          description: "urgent",
          completed: false,
        },
      ],
    });
    console.log(firstList, secondList);
    process.exit();
  } catch (error) {
    process.exit();
  }
};

seedSomeListsAndUsers();
