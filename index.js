const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// middelware
app.use(cors());
app.use(express.json());
// username : mohammadhaolader1;
// pass : saadaf404;

// database

const uri =
  "mongodb+srv://mohammadhaolader1:saadaf404@cluster0.58zpnyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
      const database = client.db("usersDb");
      const usersCollection = database.collection("users");

    // get  all data 
    app.get("/users", async (req, res) => {
      // res.send(users);
      const cusor = usersCollection.find();
      const result = await cusor.toArray();
      res.send(result);
    });

    // get single  data  with id
    app.get("/users/:userId", async (req, res) => {
      const userId = req.params.userId;

        // Assuming usersCollection is your MongoDB collection
        const cursor = usersCollection.find({ _id: userId }); // Assuming user IDs are stored as "_id" in the collection
        const result = await cursor.toArray();
    
    });

    // Delete the first document in  collection

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("delete id ", id);
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // post user data 
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
      console.log(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("crud Server");
});

// post

// app.post("/users", (req, res) => {
//   console.log("post api is hiting");
//   console.log(req.body);
//   const newUser = req.body;
//   newUser.id = users.length + 1;
//   users.push(newUser);
//   res.send(newUser);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
