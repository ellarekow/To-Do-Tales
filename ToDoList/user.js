const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '/home/ella/Documents/490/NodeJS/.env' });
const col = 'Users';
const db = 'ToDo';

async function createNewUser(client, newUser) {
    const result = await client.db(db).collection(col).insertOne(newUser);

    console.log(`New user created: \n ${result.insertedId}`);

}

async function updateUser(client, user, updatedUser) {
    console.log(`updating user: ${user.username}`);

    result = await client.db(db).collection(col).updateOne({ username: user.username }, { $set: updatedUser }, { upsert: false });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);


}

async function deleteUser(client, user) {

    const result = await client.db(db).collection(col).deleteOne({ username: user.username });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${user.username} was deleted.`);

}

async function fetchUsers(client) {

    console.log("Fetching users...");
    // Select the database and collection
    const database = client.db(db); // Replace DB_NAME with your database name
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

}

module.exports = {
    createNewUser,
    fetchUsers,
    deleteUser,
    updateUser
};