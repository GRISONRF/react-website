import Parser from 'rss-parser';
import { MongoClient } from 'mongodb';

const parser = new Parser();
const MEDIUM_URL = "https://medium.com/feed/@grisonrf"; 
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'full-stack-react-db';

async function migrate() {
    const client = new MongoClient(MONGO_URL);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection('articles');

        console.log("Connecting to Medium feed...");
        const feed = await parser.parseURL(MEDIUM_URL);
        
        console.log(`found ${feed.items.length} articles in current feed. Syncing to DB...`);

        for (const item of feed.items) {
            const slug = item.link.split("/").pop().split("?")[0];
            
            const result = await collection.updateOne(
                { name: slug },
                { 
                    $setOnInsert: { 
                        name: slug,
                        title: item.title,
                        description: item.contentSnippet?.substring(0, 150) + "...",
                        content: item["content:encoded"],
                        upvotes: 0,
                        upvoteIds: [],
                        comments: [],
                        lastSynced: new Date()
                    } 
                },
                { upsert: true }
            );

            if (result.upsertedCount > 0) {
                console.log(`Saved New: ${item.title}`);
            } else {
                console.log(`Already Exists: ${item.title}`);
            }
        }
        console.log("\n Migration complete! Your database is now synced.");
    } catch (err) {
        console.error("Migration failed:", err.message);
    } finally {
        await client.close();
    }
}

migrate();