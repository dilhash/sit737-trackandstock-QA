require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Load the MongoDB URI from the .env file
const uri = process.env.MONGODB_URI;

async function backupDatabase(database) {
    const backupDir = path.join(__dirname, 'backup');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }

    const collections = await database.collections();
    for (const collection of collections) {
        const data = await collection.find().toArray();
        const filePath = path.join(backupDir, `${collection.collectionName}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
    console.log('Database backup completed successfully.');
}

async function run() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Get the database
        const database = client.db('trackandstockdev');

        // Backup the database
        await backupDatabase(database);

    } finally {
        // Close the connection
        await client.close();
    }
}

run().catch(console.dir);
