import pkg from 'rss-to-json';
const { parse } = pkg;
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

async function importFromMedium() {
    try {
        console.log("Fetching articles from Medium RSS...");
        
        // 1. Fetch your RSS feed
        const rss = await parse('https://medium.com/feed/@grisonrf');
        
        // 2. Map the Medium data to your website's format
        const articles = rss.items.map(item => ({
            name: item.link.split('/').pop().split('?')[0], // Creates a slug from the URL
            title: item.title,
            // 'content:encoded' in RSS contains the full HTML of your article
            content: item.content || item['content:encoded'] || "Content not found",
            upvotes: 0,
            upvoteIds: [],
            comments: []
        }));

        console.log(`Found ${articles.length} articles. Connecting to Atlas...`);
        
        await client.connect();
        const db = client.db(process.env.DB_NAME || 'full-stack-react-db');
        const collection = db.collection('articles');

        // 3. Clear and Insert
        await collection.deleteMany({});
        await collection.insertMany(articles);

        console.log("Successfully imported full content for all articles!");
    } catch (err) {
        console.error("Import failed:", err);
    } finally {
        await client.close();
    }
}

importFromMedium();