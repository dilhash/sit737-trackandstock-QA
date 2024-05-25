require('dotenv').config();
const { MongoClient } = require('mongodb');

// Load the MongoDB URI from the .env file
const uri = process.env.MONGODB_URI;

async function dropAllCollections(database) {
    const collections = await database.collections();
    for (const collection of collections) {
        await collection.drop();
        console.log(`Collection ${collection.collectionName} dropped.`);
    }
}

async function run() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Get the database
        const database = client.db('trackandstockdev');

        // Drop all collections
        await dropAllCollections(database);

    } finally {
        // Close the connection
        await client.close();
    }
}

run().catch(console.dir);
