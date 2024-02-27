const { MongoClient } = require('mongodb');
require('dotenv').config();


// from : https://www.mongodb.com/docs/drivers/node/v3.6/fundamentals/promises/#:~:text=js%20driver%20uses%20the%20asynchronous,when%20executing%20long-running%20operations.

/*The Node.js driver uses the asynchronous Javascript API to communicate with your MongoDB cluster.

Asynchronous Javascript allows you to execute operations without waiting for the processing thread to become free. This helps prevent your application from becoming unresponsive when executing long-running operations. For more information about asynchronous Javascript, see the MDN web documentation on */
async function main() {
    const url = process.env.DB_CONNECTION_URL;

    const client = new MongoClient(url);

    try {
        console.log("Connecting...");
        await client.connect();
        console.log("Connected");

        console.log("Fetching databases...");

        await listDBs(client);

    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
        console.log("Closed client");
    }
}

main().catch(console.error);

async function listDBs(client) {
    dbList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    dbList.databases.forEach(db => console.log(` - ${db.name}`));
}