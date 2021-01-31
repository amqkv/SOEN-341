const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0.q6u0g.mongodb.net/testdab.341dbs?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const user = require('./src/auth/authrepository.js');

client.connect(err => {
    const collection = client.db("testdab").collection("341dbs");
    // perform actions on the collection object
    const test_user = new user({username: 'test'});


    client.close();
});

//mongoose.connect('mongodb+srv://admin:<password>@cluster0.q6u0g.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});


app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('Example app listening at http: localhost:${port}')
        });

