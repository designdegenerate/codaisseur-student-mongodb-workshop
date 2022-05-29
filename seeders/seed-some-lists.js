const mongoose = require("mongoose");
const List = require("../models/List");

mongoose.connect(
  "mongodb+srv://dbAdmin:lb63hneyWNalFZhj@cluster0.bsw1yaz.mongodb.net/?retryWrites=true&w=majority"
);

const seedSomeLists = async () => {
  try {
    const someLists = await List.create(
      {
        user: "laurens",
        createdAt: new Date(),
        updatedAt: new Date(),
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
      },
      {
        user: "david",
        createdAt: new Date(),
        updatedAt: new Date(),
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
      }
    );
    console.log(someLists);
    process.exit()
  } catch (error) {
    return console.log(error);
  }
};

seedSomeLists();
