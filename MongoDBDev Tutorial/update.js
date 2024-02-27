const { MongoClient, MongoGridFSChunkError } = require('mongodb');
const stars = "************";
require('dotenv').config;



async function main() {
    const url = process.env.DB_CONNECTION_URL;

    const client = new MongoClient(url);

    try {
        console.log("Connecting...");
        await client.connect();
        console.log("Connected");

        await findListingByName(client, "Infinite Views");
        await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8 });
        await findListingByName(client, "Infinite Views");

        await findListingByName(client, "Cozy Cottage");
        await upsertListingByName(client, "Cozy Cottage", { name: "Cozy Cottage", bedrooms: 2, bathrooms: 1 });
        await findListingByName(client, "Cozy Cottage");


        await updateAllListingsToHavePropertyType(client);


    } finally {
        await client.close();
        console.log("Closed client");
    }
}

main().catch(console.error);

async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

//upsert is update and insert
async function upsertListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updatedListing }, { upsert: true });
    console.log(`${stars} ${result.matchedCount} document(s) matched the query criteria. ${stars}`);

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}

async function updateAllListingsToHavePropertyType(client) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany({ property_type: { $exists: false } }, { $set: { property_type: "Unknown" } });
    console.log(`${stars} ${result.matchedCount} document(s) matched the query criteria. ${stars}`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function findListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

    if (result) {
        console.log(`${stars} Found a listing in the db with the name '${nameOfListing}': ${stars}`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}