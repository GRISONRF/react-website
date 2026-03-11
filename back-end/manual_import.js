import { MongoClient } from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'full-stack-react-db';
const oldArticles = [
    {
        name: "tests-notes-tests-7304bb3d5379",
        title: "[Tests Notes] TESTS",
        description: "Recently, during an interview, I realized that my know...",
    },
    {
        name: "oop-notes-dependency-inversion-principle-dip-ca3ca4a663ae", 
        title: "[OOP Notes] Dependency Inversion Principle (DIP)",
        description: "SOLID is an acronym used to refer to a group of five importa...",
    },
    {
        name: "oop-notes-interface-segregation-principle-isp-913b4f5ff67d", 
        title: "[OOP Notes] Interface Segregation Principle (ISP)",
        description: "SOLID is an acronym used to refer to a group of five importa...",
    },
    {
        name: "oop-notes-liskov-substitution-principle-lsp-3fd6ee9d801b", 
        title: "[OOP Notes] Liskov Substitution Principle (LSP)",
        description: "SOLID is an acronym used to refer to a group of five importa...",
    },
    {
        name: "oop-notes-open-closed-principle-c228e25af1f9", 
        title: "[OOP Notes] Open / Closed Principle (OCP)",
        description: "SOLID is an acronym used to refer to a group of five importa...",
    },
    {
        name: "java-notes-single-responsibility-principle-srp-17a682610ca7", 
        title: "[OOP Notes] Single Responsibility Principle (SRP)",
        description: "SOLID is an acronym used to refer to a group of five importa...",
    },
    {
        name: "java-notes-very-basics-9a7d52e1ba56", 
        title: "[Java notes] Very basics",
        description: "These notes are assuming Java is NOT your first language!",
    },
    {
        name: "operating-systems-notes-fundamentals-a2971dd9066a", 
        title: "[Operating Systems Notes] Fundamentals",
        description: "Using a computer is an interactive experience. When we pre...",
    },
    {
        name: "rest-api-notes-82489a26f3f2", 
        title: "REST API",
        description: "What is API. API stands for Application Programming Interfa...",
    },
    {
        name: "dsa-notes-nodes-and-linked-lists-26b17cfb711", 
        title: "[DSA notes] Nodes and Linked Lists",
        description: "NODES. Nodes are a basic data structure that contains data...",
    },
    {
        name: "dsa-notes-hash-map-hash-table-9c3bac17b525", 
        title: "[DSA notes] Hash map / Hash table",
        description: "When to use: Used when speedy, insertion, deletion and lo...",
    },
    {
        name: "dsa-notes-arrays-ce6672182750", 
        title: "[DSA notes] Arrays and Strings",
        description: "What is Array in Data Structure: An array is a data structur...",
    },
    {
        name: "data-structures-and-algorithms-32915ebc1a9d", 
        title: "DATA STRUCTURES AND ALGORITHMS",
        description: "DATA STRUCTURES AND ALGORITHMS review notes. Algorithms tran...",
    },
    {
        name: "stacks-and-queues-f3fd50e6bd1d", 
        title: "[DSA notes] Stacks and Queues",
        description: "Lists are mutable, ordered, iterable, can insert anywhere an...",
    },
    {
        name: "runtime-complexity-c5b1f9d928a", 
        title: "Runtime Complexity",
        description: "What it is: Fancy word for ‘speed’. More detailed: It is how...",
    },


];

async function runManualImport() {
    const client = new MongoClient(MONGO_URL);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection('articles');

        console.log("Starting manual import...");

        for (const article of oldArticles) {
            await collection.updateOne(
                { name: article.name },
                { 
                    $setOnInsert: { 
                        ...article,
                        content: `<p>This article was manually imported. Visit Medium to read the full text.</p>`,
                        upvotes: 0,
                        upvoteIds: [],
                        comments: [],
                        lastSynced: new Date()
                    } 
                },
                { upsert: true }
            );
            console.log(`Processed: ${article.title}`);
        }

        console.log("\nDone! Check your website now.");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

runManualImport();