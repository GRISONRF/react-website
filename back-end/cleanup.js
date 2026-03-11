import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function cleanAndImport() {
    try {
        await client.connect();
        const db = client.db('full-stack-react-db');
        const collection = db.collection('articles');

        // 1. WIPE THE OLD DATA
        await collection.deleteMany({}); 
        console.log("Old articles deleted.");

    } finally {
        await client.close();
    }
}
cleanAndImport();