const express = require(`express`);
const app = express();
require('dotenv').config();

// const cors = require('cors');
const mongodb = require('mongodb');
const path = require('path');
const PORT = process.env.port || 3000;

const userFunctions = require('./ToDoList/user');



const url = process.env.DB_CONNECTION_URL;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
})

// app.use(cors());

// middlewear (between request and result) 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


//Used for css in the tutorial 
// app.use(express.static(path.join(__dirname, '/public')));


// index page
app.get('^/$|/index(.html)?', (req, res) => {
    // anon function 
    // res.sendFile('./html/index.html', { root: __dirname });

    res.sendFile(path.join(__dirname, 'html', 'index.html'));

})

app.get('/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'login.html'));

})

app.get('/signup(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'signup.html'));
})

app.get('/allInfo(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'allInfo.html'));
})

app.get('/data', async (req, res) => {
    console.log(`getting data!`);

    const client = new mongodb.MongoClient(url);
    console.log('Connecting to MongoDB...');


    try {
        console.log('Starting MongoDB connection...');

        // Use connect method to connect to the Server
        await client.connect();
        console.log("Connected successfully to server\n\n\n");

        const results = await userFunctions.fetchUsers(client);

        results.forEach(user => {
            console.log(user);
        });

        res.json(results);


    } catch (err) {
        console.log(err);

    } finally {
        await client.close();
    }
});

// // 404 page 
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', '404.html'));
})

// server listening for requests 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));