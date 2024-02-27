// run with ``node connect.js``
const { MongoClient } = require('mongodb');
require('dotenv').config;

// Connection URL with the database name
const url = process.env.DB_CONNECTION_URL;

// Create a new MongoClient
const client = new MongoClient(url);

async function main() {
    try {
        console.log('Starting MongoDB connection...');

        // Use connect method to connect to the Server
        await client.connect();
        console.log("Connected successfully to server/n/n/n/n");

        console.log("Please choose an action: \n1. Create a new profile\n2. List Profiles\n3. Update a Profile\n4. Delete a Profile");

    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

main();