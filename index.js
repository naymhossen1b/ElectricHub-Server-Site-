const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const categoryCollection = client.db("electricHub").collection("categoryDB");

    const tabletCollection = client.db("electricHub").collection("tabletsDB");
    const laptopCollection = client.db("electricHub").collection("laptopsDB");
    const tvsCollection = client.db("electricHub").collection("tvsDB");
    const headPhoneCollection = client.db("electricHub").collection("headphoneDB");
    const watchCollection = client.db("electricHub").collection("watchesDB");
    const gamingCollection = client.db("electricHub").collection("gamingDB");


    ////////Add Product///////////
    app.post("/add/gaming", async (req, res) => {
      const newProduct = req.body
      const result = await gamingCollection.insertOne(newProduct);
      res.send(result);
    });
    app.post("/add/TV", async (req, res) => {
      const newProduct = req.body
      const result = await tvsCollection.insertOne(newProduct);
      res.send(result);
    });
    app.post("/add/watchs", async (req, res) => {
      const newProduct = req.body
      const result = await watchCollection.insertOne(newProduct);
      res.send(result);
    });
    app.post("/add/Teblets", async (req, res) => {
      const newProduct = req.body
      const result = await tabletCollection.insertOne(newProduct);
      res.send(result);
    });
    app.post("/add/Laptop", async (req, res) => {
      const newProduct = req.body
      const result = await tvsCollection.insertOne(newProduct);
      res.send(result);
    });
    app.post("/add/headset", async (req, res) => {
      const newProduct = req.body
      const result = await tvsCollection.insertOne(newProduct);
      res.send(result);
    });


    ///watch DATA ////////////////////////////
    app.get("/watch", async (req, res) => {
      const cursor = watchCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/watch", async (req, res) => {
      const newData = req.body;
      const result = await watchCollection.insertOne(newData);
      res.send(result);
    });
    ///Gaming DATA ////////////////////////////
    app.get("/gaming", async (req, res) => {
      const cursor = gamingCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/gaming", async (req, res) => {
      const newData = req.body;
      const result = await gamingCollection.insertOne(newData);
      res.send(result);
    });

    // ///TVS DATA
    app.get("/headphone", async (req, res) => {
      const cursor = headPhoneCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/headphone", async (req, res) => {
      const newData = req.body;
      const result = await headPhoneCollection.insertOne(newData);
      res.send(result);
    });

    // ///TVS DATA
    app.get("/tvs", async (req, res) => {
      const cursor = tvsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/tvs", async (req, res) => {
      const newData = req.body;
      const result = await tvsCollection.insertOne(newData);
      res.send(result);
    });

    // // LAPTOPS DB
    app.get("/laptop", async (req, res) => {
      const cursor = laptopCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/laptop", async (req, res) => {
      const newData = req.body;
      const result = await laptopCollection.insertOne(newData);
      res.send(result);
    });

    // // TABLETS DB
    app.get("/tablets", async (req, res) => {
      const cursor = tabletCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/tablets", async (req, res) => {
      const newData = req.body;
      const result = await tabletCollection.insertOne(newData);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post("/products", async (req, res) => {
      const newData = req.body;
      const result = await userCollection.insertOne(newData);
      res.send(result);
    });


    /* Details product function  *////////////////////////////////////////////

    app.get("/TV/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id)};
      const singelProduct = await tvsCollection.findOne(filter);
      res.send(singelProduct);
    });
    app.get("/gaming/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id)};
      const singelProduct = await gamingCollection.findOne(filter);
      res.send(singelProduct);
    });

    app.get("/watchs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id)};
      const cursor = await watchCollection.findOne(filter);
      res.send(cursor);
    });
    app.get("/Tablets/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id)};
      const cursor = await tabletCollection.findOne(filter);
      res.send(cursor);
    });
    app.get("/Laptop/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id)};
      const cursor = await laptopCollection.findOne(filter);
      res.send(cursor);
    });
    app.get("/headset/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id)};
      const cursor = await headPhoneCollection.findOne(filter);
      res.send(cursor);
    });


    ////////////////////PUT/UPDATE//////////////////

    app.get("/update/TV/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id)};
      const singelProduct = await tvsCollection.findOne(query);
      res.send(singelProduct);
    });
    app.get("/update/watchs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id)};
      const singelProduct = await watchCollection.findOne(query);
      res.send(singelProduct);
    });

    app.get("/update/headset/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id)};
      const singelProduct = await headPhoneCollection.findOne(query);
      res.send(singelProduct);
    });

    app.get("/update/Laptop/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id)};
      const singelProduct = await laptopCollection.findOne(query);
      res.send(singelProduct);
    });

      app.get("/update/Tablets/:id", async (req, res) => {
        const id = req.params.id;
      const query = { _id: new ObjectId(id)};
      const singelProduct = await tabletCollection.findOne(query);
      res.send(singelProduct);
      });
      app.get("/update/gaming/:id", async (req, res) => {
        const id = req.params.id;
      const query = { _id: new ObjectId(id)};
      const singelProduct = await gamingCollection.findOne(query);
      res.send(singelProduct);
      });

      /// data put function///////////////////////////
    app.put("/TV/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const option = { upert: true };
      const updatedProducts = req.body;
      const tvs = {
        $set: {
          tv_name: updatedProducts.tv_name,
          brand_name: updatedProducts.brand_name,
          type: updatedProducts.type,
          tv_price: updatedProducts.tv_price,
          ratings: updatedProducts.ratings,
          tv_image: updatedProducts.tv_image,
        },
      };
      const result = await tvsCollection.updateOne(filter, tvs, option);
      res.send(result);
    });
    app.put("/gaming/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const option = { upert: true };
      const updatedProducts = req.body;
      const tvs = {
        $set: {
          tv_name: updatedProducts.tv_name,
          brand_name: updatedProducts.brand_name,
          type: updatedProducts.type,
          tv_price: updatedProducts.tv_price,
          ratings: updatedProducts.ratings,
          tv_image: updatedProducts.tv_image,
        },
      };
      const result = await gamingCollection.updateOne(filter, tvs, option);
      res.send(result);
    });
    
    app.put("/watchs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const option = { upert: true };
      const updatedProducts = req.body;
      const tvs = {
        $set: {
          tv_name: updatedProducts.tv_name,
          brand_name: updatedProducts.brand_name,
          type: updatedProducts.type,
          tv_price: updatedProducts.tv_price,
          ratings: updatedProducts.ratings,
          tv_image: updatedProducts.tv_image,
        },
      };
      const result = await watchCollection.updateOne(filter, tvs, option);
      res.send(result);
    });
    
    app.put("/headset/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const option = { upert: true };
      const updatedProducts = req.body;
      const tvs = {
        $set: {
          tv_name: updatedProducts.tv_name,
          brand_name: updatedProducts.brand_name,
          type: updatedProducts.type,
          tv_price: updatedProducts.tv_price,
          ratings: updatedProducts.ratings,
          tv_image: updatedProducts.tv_image,
        },
      };
      const result = await headPhoneCollection.updateOne(filter, tvs, option);
      res.send(result);
    });

    app.put("/Tablets/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const option = { upert: true };
      const updatedProducts = req.body;
      const tvs = {
        $set: {
          tv_name: updatedProducts.tv_name,
          brand_name: updatedProducts.brand_name,
          type: updatedProducts.type,
          tv_price: updatedProducts.tv_price,
          ratings: updatedProducts.ratings,
          tv_image: updatedProducts.tv_image,
        },
      };
      const result = await tabletCollection.updateOne(filter, tvs, option);
      res.send(result);
    });

    app.put("/Laptop/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const option = { upert: true };
      const updatedProducts = req.body;
      const tvs = {
        $set: {
          tv_name: updatedProducts.tv_name,
          brand_name: updatedProducts.brand_name,
          type: updatedProducts.type,
          tv_price: updatedProducts.tv_price,
          ratings: updatedProducts.ratings,
          tv_image: updatedProducts.tv_image,
        },
      };
      const result = await laptopCollection.updateOne(filter, tvs, option);
      res.send(result);
    });

    ///////////////products data cart////////////////////////////////////////////////////

    app.delete('/products/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id)};
      const result = await userCollection.deleteOne(query);
      res.send(result)
    })

    ///category and tvs data/////////////////////////
    app.get("/category", async (req, res) => {
      const cursor = categoryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/category", async (req, res) => {
      const newData = req.body;
      const result = await categoryCollection.insertOne(newData);
      res.send(result);
    });

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
