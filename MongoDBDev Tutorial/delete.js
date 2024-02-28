const { MongoClient } = require('mongodb');
require('dotenv').config();



async function main() {
    const url = process.env.DB_CONNECTION_URL;

    const client = new MongoClient(url);

    try {
        await client.connect();

        await printIfListingExists(client, "Cozy Cottage");

        await deleteListingByName(client, "Cozy Cottage");

        await printIfListingExists(client, "Cozy Cottage");

    } finally {
        await client.close();
        console.log("Closed client");
    }
}

main().catch(console.error);

async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function printIfListingExists(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

    if (result) {
        if (result.last_scraped) {
            console.log(`Found a listing in the collection with the name '${nameOfListing}'. Listing was last scraped ${result.last_scraped}.`);
        } else {
            console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        }
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}