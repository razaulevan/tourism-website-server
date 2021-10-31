const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cf9qr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db('touristSpots');
        const servicesCollection = database.collection('services');
        const ordersCollection = database.collection('orders');


        //get api
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
        app.get('/orders', async (req, res) => {
            const cursor2 = ordersCollection.find({});
            const orders = await cursor2.toArray();
            res.send(orders);
        })
        //get single service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })
        app.get('/orders/:id', async (req, res) => {
            const id1 = req.params.id1;
            const query = { _id: ObjectId(id1) };
            const order = await ordersCollection.findOne(query);
            res.json(order);
        })
        //post
        app.post('/services', async (req, res) => {
            const service = req.body;

            console.log('hit post');

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result)

        });

        app.post('/orders', async (req, res) => {
            const order = req.body;

            const result2 = await ordersCollection.insertOne(order);
            res.json(result2)

        })

    }
    finally {

    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('evan');
});
app.listen(port, () => {
    console.log('ev', port);
})
// user: visitbd
//pw : xmh8dWzBqLQ5Swpe