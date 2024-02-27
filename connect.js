// run with ``node connect.js``
console.log('Starting MongoDB connection...');
const { MongoClient } = require('mongodb');
require('dotenv').config;

// Connection URL with the database name
const url = process.env.DB_CONNECTION_URL;

// Create a new MongoClient
const client = new MongoClient(url);

async function main() {
    try {
        // Use connect method to connect to the Server
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db('fruitsDB');

        // Perform further operations on the database here

    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

main();