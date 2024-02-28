const { MongoClient, MongoGridFSChunkError } = require('mongodb');
const stars = "************";
const xes = "xxxxxxxxxxx";
require('dotenv').config();



async function main() {
    const url = process.env.DB_CONNECTION_URL;

    const client = new MongoClient(url);

    try {
        console.log("Connecting...");
        await client.connect();
        console.log("Connected");

        await findListingByName(client, "Infinite Views");

        await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
            minimumNumberOfBedrooms: 4,
            minimumNumberOfBathrooms: 2,
            maximumNumberOfResults: 5
        });

    } finally {
        await client.close();
        console.log("Closed client");
    }

}

main().catch(console.error);

async function findListingByName(client, listingName) {
    const result = await client.db("sample_airbnb").collection("listingAndReviews").findOne({ name: listingName });

    if (result) {
        console.log(`${stars} Found Single Listing ${stars}`);
        console.log(result);
    } else {
        console.log(`${xes} No found listing named ${listingName} ${xes}`);
    }

    console.log();
    console.log();
    console.log();
}

async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
        .find({
            bedrooms: { $gte: minimumNumberOfBedrooms },
            bathrooms: { $gte: minimumNumberOfBathrooms }
        }
        )
        .sort({ last_review: -1 })
        .limit(maximumNumberOfResults);

    // Store the results in an array
    const results = await cursor.toArray();

    // Print the results
    if (results.length > 0) {
        console.log(`${stars} Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms: ${stars}`);
        results.forEach((result, i) => {
            const date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${date}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }

    console.log();
    console.log();
    console.log();
}