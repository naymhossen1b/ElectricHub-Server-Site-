const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@firstpractice.poejscf.mongodb.net/?retryWrites=true&w=majority`;

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
    const userCollection = client.db("electricHub").collection("customarDB");
    const laptopsCollection = client.db("electricHub").collection("laptopsDB");
    const smartWatchCollection = client.db("electricHub").collection("watchDB");
    const tabletCollection = client.db("electricHub").collection("tabletsDB");
    const headPhoneCollection = client.db("electricHub").collection("headphoneDB");
    const gamingCollection = client.db("electricHub").collection("gamingDB");



    ///GAMING DATA
    app.get('/gamings', async(req, res) => {
      const cursor = gamingCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/gamings', async(req, res) => {
      const newData = req.body;
      const result = await gamingCollection.insertOne(newData);
      res.send(result)
    })


    // HEADPHONES DB
    app.get('/headphones', async(req, res) => {
      const cursor = headPhoneCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/headphones', async(req, res) => {
      const newData = req.body;
      const result = await headPhoneCollection.insertOne(newData);
      res.send(result)
    })

    // TABLETS DB
    app.get('/tablets', async(req, res) => {
      const cursor = tabletCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/tablets', async(req, res) => {
      const newData = req.body;
      const result = await tabletCollection.insertOne(newData);
      res.send(result)
    })

    // SMART WATCH DB
    app.get('/products/Watchs', async(req, res) => {
      const cursor = smartWatchCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/products/Watchs', async(req, res) => {
      const newData = req.body;
      const result = await smartWatchCollection.insertOne(newData);
      res.send(result)
    })


    ///laptop data

    app.get('/products/Laptop', async(req, res) => {
      const cursor = laptopsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/products', async(req, res) => {
      const newData = req.body;
      const result = await laptopsCollection.insertOne(newData);
      res.send(result)
    })


    ///category and tvs data/////////////////////////
    app.get('/products', async(req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    // brands category
    app.post('/products', async(req, res) => {
      const newData = req.body;
      const result = await userCollection.insertOne(newData);
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Electronic server is running");
});

app.listen(port, () => {
  console.log(`Eloctronic server port is running: ${port}`);
});
