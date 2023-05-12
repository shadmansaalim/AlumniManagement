//Imports
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require("bcrypt");
const saltRounds = 10;


const app = express();
const port = process.env.PORT || 3000;

// Middleware use for server
app.use(cors());
app.use(express.json());


//MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tligr41.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("alumnidb");
        const usersCollection = database.collection("users");

        // WRITE ALL API HERE

        //GET USERS FROM DB
        app.get('/users', async (req, res) => {
            const email = req.query.email;

            if (email) {
                const user = await usersCollection.findOne({ email: email });
                res.json(user);
            }
            else {
                const cursor = usersCollection.find({});
                const users = await cursor.toArray();

                res.json(users);
            }
        })

        //Add users to database those who signed up with Email Password
        app.post('/users', async (req, res) => {
            const userCount = await usersCollection.countDocuments();

            const user = req.body;
            if(user.password)
                user.password = bcrypt.hashSync(user.password, saltRounds);
            else
                res.status(400).json({message:'Password is required!'});

            // Unique Certificate Number for graduates
            const UCN = (new Date().getFullYear()).toString() + (userCount + 1).toString();
            user.UCN = parseInt(UCN);

            const result = await usersCollection.insertOne(user);
            res.json(user);
        })

        app.get('/users/login', async (req, res) => {
            const email = req.query.email;
            const password = req.query.password;
            const user = await usersCollection.findOne({ email: email });

            if (user && bcrypt.compareSync(password, user.password))
                res.json(user);
            else
                //Login Fail
                res.json(null);
        })

        // Verify Alumni Certificate
        app.get('/verify-alumni-certificate', async (req, res) => {
            const UCN = parseInt(req.query.ucn);
            const checkUser = await usersCollection.findOne({ UCN: UCN });
            console.log(checkUser);
            if (checkUser) {
                res.json({ verified: true });
            }
            else {
                res.json({ verified: false });
            }
        })


    }
    finally {
        //   await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    console.log('Hitting backend');
    res.send(`Alumni Management Web App Backend`)
})

app.listen(port, () => {
    console.log('Listening to port number ', port);
})



