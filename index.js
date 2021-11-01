const express = require("express")
const { MongoClient } = require('mongodb');
const cors = require("cors")
const ObjectId = require("mongodb").ObjectId
require('dotenv').config()

// ----------------App work-----------------------
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//----------------------------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vkykc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)
// -------------------------------------------------
app.get("/", (req, res) => {
    res.send("running port on server")
})

client.connect(err => {
    const productsCollection = client.db("new-guid").collection("services");
    const ordersCollection = client.db("new-guid").collection("orders");

    // post 
    app.post("/addServices", (req, res) => {
        productsCollection.insertOne(req.body).then((result) => {
            res.send(result.insertedId)
        })

    })

    // get 
    app.get("/services", async (req, res) => {
        const result = await productsCollection.find({}).toArray()
        res.send(result);

    })


    app.get("/services/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const services = await servicesCollection.findOne(query);
        // console.log('here', id);
        res.send(services)

    })

    // delete
    app.delete("/services/:id", async (req, res) => {
        const id = req.params.id
        const query = { _id: ObjectId(id) }

        const result = await servicesCollection.deleteOne(query);

        res.send(result)
    })

    app.post("/myorders", async (req, res) => {
        const order = req.body;
        const result = await ordersCollection.insertOne(order);
        res.json(result);
        console.log(result, "my oreder hoiche")
    })


    app.get("/manageuser", async (req, res) => {
        const result = await ordersCollection.find({}).toArray()

        res.send(result);

    })

    app.delete("/manageuser/:id", async (req, res) => {
        const id = req.params.id
        const query = { _id: ObjectId(id) }

        const result = await ordersCollection.deleteOne(query);

        res.send(result)
    })



    // client.close();
});




app.listen(port, () => {
    console.log("running port on", 5000)
})