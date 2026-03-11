import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '..', 'dist');

import Parser from 'rss-parser';
const parser = new Parser();
const MEDIUM_URL = "https://medium.com/feed/@grisonrf";

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
)

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const app = express();
app.use(express.json());
let db;

async function connectToDB() {
    const uri = !process.env.MONGODB_USERNAME 
    ? 'mongodb://127.0.0.1:27017' 
    : `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.fgj7d0n.mongodb.net/?appName=Cluster0`

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    db = client.db('full-stack-react-db');
}

app.use(express.static(distPath));
// app.use(express.static(path.join(__dirname, '../dist')));

// app.get(/^(?!\/api).+/, (req, res) => {
app.get(/^\/(?!api).*/, (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send("Frontend build not found.");
    }
});

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name });
    res.json(article);
});

app.use(async function(req, res, next) {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            const user = await admin.auth().verifyIdToken(authtoken);
            req.user = user;
        } catch (e) {
            console.log("Invalid token");
        }
    }

    next();
});

app.post('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user  || {};

    if (!uid) return res.status(401).send("Must be logged in to upvote");

    const article = await db.collection('articles').findOne({ name });

    if (!article) return res.sendStatus(404);

    const upvoteIds = article.upvoteIds || [];
    const hasUpvoted = upvoteIds.includes(uid);
    
    if (!hasUpvoted) {
        const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
            $inc: { upvotes: 1 },
            $push: { upvoteId: uid }
        }, {
            returnDocument: "after",
        });
        res.json(updatedArticle);
    } else {
        res.sendStatus(403);
    }

});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy, text };

    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name}, {
        $push: { comments: newComment }
    }, { returnDocument: "after",});

    res.json(updatedArticle)
});

app.get("/api/medium-articles", async (req, res) => {
    try {
        // Wrap the Medium sync in its own try/catch
        try {
            const feed = await parser.parseURL(MEDIUM_URL);
            for (const item of feed.items) {
                const slug = item.link.split("/").pop().split("?")[0];
                await db.collection("articles").updateOne(
                    { name: slug },
                    { 
                        $setOnInsert: { 
                            name: slug,
                            title: item.title,
                            description: item.contentSnippet,
                            content: item["content:encoded"],
                            upvotes: 0,
                            upvoteIds: [],
                            comments: []
                        } 
                    },
                    { upsert: true }
                );
            }
        } catch (mediumErr) {
            console.log("⚠️ Medium Sync failed (Rate Limited), loading from DB only.");
        }

        // ALWAYS return the DB results, regardless of Medium status
        const allArticles = await db.collection("articles").find({}).toArray();
        res.json(allArticles);

    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "Failed to load articles from database" });
    }
});

app.get("/api/medium-articles/:name", async (req, res) => {
    const { name } = req.params;

    const feed = await parser.parseURL(MEDIUM_URL);

    const article = feed.items.find(item =>
        item.link.includes(name)
    );

    if (!article) {
        return res.sendStatus(404);
    }

    res.json({
        name,
        title: article.title,
        content: article["content:encoded"]
    });
});

const PORT = process.env.PORT || 8000;

async function start() {
    await connectToDB();
    app.listen(PORT, function () {
        console.log('Server is listening on port ' + PORT);
    });
}

start();