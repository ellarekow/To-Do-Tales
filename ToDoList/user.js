const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '/home/ella/Documents/490/NodeJS/.env' });
const col = 'Users';

async function createNewUser(client, newUser) {
    const result = await client.db("ToDo").collection(col).insertOne(newUser);

    console.log(`New user created: \n ${result.insertedId}`);

}

async function fetchUsers(client) {
    try {

        console.log("Fetching users...");
        // Select the database and collection
        const database = client.db('ToDo'); // Replace DB_NAME with your database name
        const collection = database.collection('Users'); // Replace 'Users' with your collection name

        // Retrieve all documents from the collection
        const cursor = collection.find();

        // Convert cursor to array of documents
        const documents = await cursor.toArray();


        if (documents.length == 0) {
            console.log("No users");
        }
        else {
            console.log("Users:");


            documents.forEach(user => {
                console.log(user);
            });
        }
    } catch (err) {
        throw new Error(`Error fetching users: ${err}`);
    }
}

module.exports = {
    createNewUser,
    fetchUsers
};