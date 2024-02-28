const { MongoClient } = require('mongodb');
const stars = "************";
require('dotenv').config();



async function main() {
    const url = process.env.DB_CONNECTION_URL;

    const client = new MongoClient(url);

    try {
        await client.connect();

        await createListing(client,
            {
                name: "Lovely Loft",
                summary: "A charming loft in Paris",
                bedrooms: 1,
                bathrooms: 1
            }
        );

        await createMultiListings(client,
            [{
                name: "Lovely Loft",
                summary: "A charming loft in Paris",
                bedrooms: 1,
                bathrooms: 1
            }]
        );

        await createMultiListings(client, [
            {
                name: "Infinite Views",
                summary: "Modern home with infinite views from the infinity pool",
                property_type: "House",
                bedrooms: 5,
                bathrooms: 4.5,
                beds: 5
            },
            {
                name: "Private room in London",
                property_type: "Apartment",
                bedrooms: 1,
                bathroom: 1
            },
            {
                name: "Beautiful Beach House",
                summary: "Enjoy relaxed beach living in this house with a private beach",
                bedrooms: 4,
                bathrooms: 2.5,
                beds: 7,
                last_review: new Date()
            }
        ]);

    } finally {
        await client.close();
        console.log("Closed client");
    }
}

main().catch(console.error);

async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("ListingAndReviews").insertOne(newListing);

    console.log(`${stars} Single Listings ${stars}`);

    console.log(`New listing created. id: ${result.insertedId}`);

    console.log();
    console.log();
    console.log();
}

async function createMultiListings(client, newListings) {
    const result = await client.db("sample_airbnb").collection("ListingsAndReviews").insertMany(newListings);

    console.log(`${stars} Multi-Listings ${stars}`);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);

    console.log();
    console.log();
    console.log();
}