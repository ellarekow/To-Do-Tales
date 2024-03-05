const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '/home/ella/Documents/490/NodeJS/.env' });
const prompt = require('prompt-sync')();


const userFunctions = require('./user');

const url = process.env.DB_CONNECTION_URL;


const col = "Users";


async function main() {
    const client = new MongoClient(url);

    try {
        console.log('Starting MongoDB connection...');

        // Use connect method to connect to the Server
        await client.connect();
        console.log("Connected successfully to server\n\n\n");

        // console.log("Please choose an action: \n1. Create a new profile\n2. List Profiles\n3. Update a Profile\n4. Delete a Profile");

        await userFunctions.fetchUsers(client);

        // const user = {
        //     "username": "joe",
        //     "email": "joe@example.com",
        //     "password": "joeexamplepassword123"
        // };

        // await userFunctions.createNewUser(client, user);

    } catch (err) {
        console.log(err);

    } finally {
        await client.close();
    }
}




main();

