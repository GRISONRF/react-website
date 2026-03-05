import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';

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
    const uri = 'mongodb://127.0.0.1:27017';

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
    const { uid } = req.user;

    const articles = await db.collection('articles').findOne({ name });

    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);

    if (!canUpvote) {
        const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
            $inc: { upvotes: 1 },
            $push: { upvotesId: uid }
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
        const feed = await parser.parseURL(MEDIUM_URL);

        const articles = feed.items.map(item => {
        const slug = item.link.split("/").pop().split("?")[0];

        return {
            name: slug,
            title: item.title,
            description: item.contentSnippet,
            content: item["content:encoded"]
        };
    });

        // Ensure article exists in MongoDB
        for (const article of articles) {
            const existing = await db.collection("articles").findOne({
                name: article.name
            });

            if (!existing) {
                await db.collection("articles").insertOne({
                    name: article.name,
                    upvotes: 0,
                    upvoteIds: [],
                    comments: []
                });
            }
        }

        res.json(articles);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load Medium articles" });
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

async function start() {
    await connectToDB();
    app.listen(8000, function () {
        console.log('Server is listening on port 8000');
    });
}

start();