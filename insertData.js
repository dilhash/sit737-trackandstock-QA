require('dotenv').config();
const { MongoClient } = require('mongodb');

// Replace with your connection string from environment variables
const uri = process.env.MONGODB_URI;

async function run() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Get the database
        const database = client.db('trackandstockdev');

        // Create collections (they will be created if they don't exist)
        const userCollection = database.collection('user');
        const pantryItemsCollection = database.collection('pantryitems');
        const recipesCollection = database.collection('recipes');

        // Insert sample data into the collections
        const userDocument = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword'
        };

        const pantryItemDocument = {
            itemName: 'Flour',
            quantity: 2,
            unit: 'kg'
        };

        const recipeDocument = {
            recipeName: 'Pancakes',
            ingredients: [
                { item: 'Flour', quantity: 1, unit: 'cup' },
                { item: 'Milk', quantity: 1, unit: 'cup' },
                { item: 'Egg', quantity: 1, unit: 'piece' }
            ],
            instructions: 'Mix ingredients and cook on a skillet.'
        };

        await userCollection.insertOne(userDocument);
        await pantryItemsCollection.insertOne(pantryItemDocument);
        await recipesCollection.insertOne(recipeDocument);

        console.log('Data inserted successfully');
    } finally {
        // Close the connection
        await client.close();
    }
}

run().catch(console.dir);
