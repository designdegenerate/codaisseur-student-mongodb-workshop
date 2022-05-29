# Introduction to MongoDB Workshop
Made for fellow Codaisseur students. Licensed under the CC0.

## Intro

### Relational Databases
So far we have learned the Postgres, a relational or SQL database. This is a fancy way of saying, a database existing as a table made of rows and columns which have a *relationship* between each other. Each column can be set as a certain datatype (string, integer, and so on) which ensures that data will be consistent, and tables can be linked to each other with one-to-one, one-to-many, and many-to-many relationships. However, this isn’t the only type of database. Today we are going to look at MongoDB, a NoSQL database.

![](https://img-9gag-fun.9cache.com/photo/72699_460s.jpg)

### MongoDB
Instead of working around tables, MongoDB works around a JSON-like structure for storing its data. In each “table” (known as a collection,) you can store “rows” (known as documents,) which can have completely different data structures from each other! Unlike relational databases where each row needs a column cell filled, MongoDB has few restrictions on how each document looks like. This also makes it ideal for storing nested data without having to create a new table with foreign-key relations. Here’s how a sample “document” looks like:

```
{
   _id: ObjectId(7df78ad8902c)
   title: 'What is MongoDB?', 
   description: 'MongoDB is no sql database',
   by: 'Laurens',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100, 
   comments: [	
      {
         user:'david',
         message: 'MongoDB ROCKS!!!!',
         dateCreated: new Date(2022,1,20,2,15),
         like: 0 
      },
      {
         user:'swen',
         message: 'postgres or bust',
         dateCreated: new Date(2022,1,25,7,45),
         like: 5
      }
   ]
}
```

### Some New Terms

- **Cluster**: a whole MongoDB instance, often split into “shards.”
- **Shards/Sharding**: MongoDB can store its database across multiple computers, each version of that data is known as a shard. You won’t have to bother with this for now, but it get mentioned online a lot.
- **Collections**: whereas Postgres has many tables, MongoDB has collections.
- **Document**: equivalent to a “row” in Postgres, but similar in structure to a JSON/Javascript object.
- **Field**: equivalent to a “column” in Postgres, but it refers to the “key-value” relationship.
- **ObjectId**: the same way each row in postgres gets a unique id, MongoDB documents have an ``ObjectId`` “datatype” to ensure that they are unique.

TODO: Talk about linking Collections and HOW TO.

## Setting up
The easiest way to start working with MongoDB is with [MongoDB Atlas](https://www.mongodb.com/), which offers a free tier that’s good enough for learning.

### Exercise: Create a new MongoDB Database
- add screenshots here.

Talk about auth and user access

### Building a REST API using MongoDB
We’ll be building a rest API for a ToDo list app using MongoDB instead of Postgres. Start by setting up a new project with express with a single get path to “/”, and installing the mongoose npm package: ``npm install mongoose``.

### Exercise: Setup an Express App
1. Initialize npm and install ``express`` and ``mongoose``. Create a new file called ``server.js`` and setup an express server. Don’t install sequelize! It won’t be used today. (Don’t sequelize the NoSequelize!)
3. Now, connect to your database using the link you get from MongoDB atlas by adding the following inside ``server.js``.
```
const mongoose = require('mongoose');

mongoose.connect("<your link here>")
```

## Schemas and Models
MongoDB really doesn’t care how we structure a document. While this is nice to develop for, imagine if you had a collection that looked like this:

```
{
   _id: ObjectId(7df78ad8902c)
   owner: 'laurens', 
   isMature: 'nope',
   likes: 'not enough',
   posts: [	
      {
         title:'Flexbox is awesome',
         description: 'but grid is better',
         dateCreated: new Date(2022,1,20,2,15),
      },
      {
         title:'styled components are meh',
         description: 'I am not convinced',
         dateCreated: new Date(2022,1,20,2,15),
      },
   ]
},
{
   _id: ObjectId(7df78ad8902c)
   userName: 'david',
   isMature: true,
   likes: 1000,
   posts: [	
      {
         header:'Grid is the best',
         contents: 'death to flexbox!',
         dateCreated: new Date(2022,1,20,2,15),
      },
      {
         header:'styled components are AMAZING',
         contents: 'Laurens is wrong.',
         dateCreated: new Date(2022,1,20,2,15),
      },
   ]
}
```

You would have problems if you tried mapping, filtering, or even finding trough this data.

## How Schemas and Models Solve this.
With schemas we define each field and their datatype so we hopefully never run into the above. These schemas then live inside a model file in order to do CRUD operations (creating, reading, updating, deleting). For example, with the above, we could have a saner schema that looks like this:

```
const blog = new Schema({
  owner: String,
  isMature: Boolean,
  createdAt: Date,
  updatedAt: Date,
  likes: Number
  posts: [{
    title: String,
    content: String,
    dateCreated: Date
  }]
});
```

## Singular and Plural Casing
Just like in Sequelize, models are always named in **singular** case. Mongoose then pluralizes it for you.

```
const Blog = mongoose.model('Blog', blog);
```

## Exercise: Setting up a Model and Seeding Some Data
1. Create a new model file in ```/models/List.js```.
2. Add a new list Schema and Model:

```
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const listSchema = new Schema({
  owner: String,
  createdAt: Date,
  updatedAt: Date,
  items: [{
    title: String,
    description: String,
    completed: Boolean,
  }]
});

const List = model('List', listSchema);
export default List;
```

3. Create a new seed file in ```/seeders/seed-some-lists.js```.
4. Add a new list seed:

```
const mongoose = require("mongoose");
const List = require("../models/List");

mongoose.connect(
  "<your mongodb url here>"
);

const seedSomeLists = async () => {
  try {
    const someLists = await List.create(
      {
        owner: "laurens",
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
        owner: "david",
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
```

5. Run the seeder as so ```node seeders/seedList.js```.
6. Check MongoDB Atlas to see whether it was successful.

## Creating GET endpoints
Once your model(s) are setup, all that’s left is to import it and calling it in order to fetch your data from the server. If this feels very similar to using sequelize, that’s because it is!

## Exercise: Create a GET endpoint to fetch all lists
1. create a new endpoint for ``/lists``
2. import your model into ``server.js`` (Hint, take a look at the seeders file above.)
3. Make the endpoint return the contents of the lists using ``const getLists = await List.find();`` By default, Model.find() returns everything inside that collection.
4. Test your endpoint using HTTPie.

```
const express = require("express")
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
const List = require("./models/List");
mongoose.connect('<your mongodb link here>')

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

```

### Exercise: Fetch a single list based on the owner
1. Create a new endpoint in ``/lists/:owner``
2. Use ``List.findOne()`` to retrieve the user from the params. (Hint: remember Sequelize? 😉)

```
app.get("/lists/:owner", async(req, res) => {
  try {
    const getList = await List.findOne({user: req.params.owner});
    res.send(getList);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
})
```

## Exercise: Creating a new POST endpoint
1. Create a new endpoint to create a new user at ``/user``
2. Get the information from the request body and use it to create a new user.

```
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
```

## Exercise: Create a DELETE endpoint
1. create a new delete endpoint at ``/list/:owner`` to delete a list.
2. Hint: You might want to use the ``Model.deleteOne()`` function.

```
app.delete("/lists/:owner", async(req, res) => {
  try {
    const deleteList = await List.deleteOne({owner: req.params.owner});
    res.send(deleteList);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
})
```

## Exercise: Create a PATCH endpoint
1. Create a new patch endpoint at ``/list/:owner/:index`` to allow users to change the title of a ToDo entry based on its index in the list.

```
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
```

## Linking Collections
Generally, the principle of MongoDB is that “data that is accessed together should be stored together.” However, there are cases where you would want multiple collections linked together with different schemas. Let’s create one together!

### Exercise: Create a new User model and link it to the List model
1. create a new model in ``/models/User.js`` with the following:

```
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true
  },
});

const User = model('User', userSchema);
module.exports = User;
```

2. Let’s create a new seed to create some users:

```
const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect(
  "<your mongodb link>"
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
```

3. Now, let’s create a new field in the List Model that references the User. Don’t forget to add ``SchemaTypes`` when destructuring mongoose! 

```
const mongoose = require('mongoose');
const { Schema, SchemaTypes, model } = mongoose;
const User = require('./User.js');

const listSchema = new Schema({
  owner: String,
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
  items: [{
    title: String,
    description: String,
    completed: Boolean,
  }]
});

const List = model('List', listSchema);
module.exports = List;
```

4. Now for the annoying part... We’ll need to delete our users and reseed them with some changes! Delete the current lists in any way you want and modify the List seed:

```
const mongoose = require("mongoose");
const List = require("../models/List");
const User = require("../models/User");

mongoose.connect(
  "<insert mongoose link here>"
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
```

5. Run your new seed!
6. Modify your ``/lists/:owner`` path to also include the user collection:

```
const getList = await List.findOne({user: req.params.owner}).populate("user");
```

7. test your new path with HTTPie and there should be a new document attached to the user field from the User collection!
