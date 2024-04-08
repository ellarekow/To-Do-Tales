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


        // const user = {
        //     "username": "joe",
        //     "email": "joe@example.com",
        //     "password": "joeexamplepassword123"
        // };

        // await userFunctions.createNewUser(client, user);

        // const ella = {
        //     "username": "ella",
        //     "email": "ella@example.com",
        //     "password": "ellaexamplepassword123"
        // }

        // const ellaUpdated = {

        //     "username": "ella",
        //     "email": "ella@fuckThisShit.com",
        //     "password": "ellaexamplepassword123"
        // }

        // const oops = {
        //     "username": "oops",
        //     "email": "oops@fuckThisShit.com",
        //     "password": "ellaexamplepassword123"
        // }

        // await userFunctions.createNewUser(client, oops);

        // await userFunctions.updateUser(client, ella, ellaUpdated);

        // await userFunctions.createNewUser(client, oops);

        // Define an array of 10 mock users
        const mockUsers = [
            {
                "username": "user1",
                "email": "user1@example.com",
                "password": "password1"
            },
            {
                "username": "user2",
                "email": "user2@example.com",
                "password": "password2"
            },
            {
                "username": "user3",
                "email": "user3@example.com",
                "password": "password3"
            },
            {
                "username": "user4",
                "email": "user4@example.com",
                "password": "password4"
            },
            {
                "username": "user5",
                "email": "user5@example.com",
                "password": "password5"
            },
            {
                "username": "user6",
                "email": "user6@example.com",
                "password": "password6"
            },
            {
                "username": "user7",
                "email": "user7@example.com",
                "password": "password7"
            },
            {
                "username": "user8",
                "email": "user8@example.com",
                "password": "password8"
            },
            {
                "username": "user9",
                "email": "user9@example.com",
                "password": "password9"
            },
            {
                "username": "user10",
                "email": "user10@example.com",
                "password": "password10"
            }
        ];

        // Iterate over the array and add each user to the database
        for (const user of mockUsers) {
            try {
                await userFunctions.createNewUser(client, user);
                console.log(`User '${user.username}' added successfully.`);
            } catch (error) {
                console.error(`Error adding user '${user.username}':`, error);
            }
        }


        await userFunctions.fetchUsers(client);


        // await userFunctions.deleteUser(client, oops);

        await userFunctions.fetchUsers(client);


    } catch (err) {
        console.log(err);

    } finally {
        await client.close();
    }
}




main();

