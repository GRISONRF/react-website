import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

const articlesToImport = [
    { name: "test-cypress", title: "Cypress", upvotes: 6, upvoteIds: [], comments: [] },
    { name: "jwt-json-web-token", title: "JWT — JSON Web Token", upvotes: 6, upvoteIds: [], comments: [] },
    { name: "basic-concepts-kafka", title: "Basic Concepts of Kafka", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "understanding-apache-kafka", title: "Understanding Apache Kafka", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "microservices-notes-part-ii", title: "MICROSERVICES NOTES [part II]", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "microservices-notes-part-i", title: "MICROSERVICES NOTES [part I]", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "spring-notes-ioc", title: "[Spring Notes] Inversion of Control in Spring", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "spring-notes-intro", title: "[Spring Notes] Introduction to Spring and Spring Boot", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "tests-notes-integration", title: "[Tests Notes] Integration Testing", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "tests-notes-unit", title: "[Tests Notes] Unit Testing", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "tests-notes-tests-7304bb3d5379", title: "[Tests Notes] TESTS", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "oop-notes-dip-ca3ca4a663ae", title: "[OOP Notes] Dependency Inversion Principle (DIP)", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "oop-notes-isp-913b4f5ff67d", title: "[OOP Notes] Interface Segregation Principle (ISP)", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "oop-notes-lsp-3fd6ee9d801b", title: "[OOP Notes] Liskov Substitution Principle (LSP)", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "oop-notes-ocp-c228e25af1f9", title: "[OOP Notes] Open / Closed Principle (OCP)", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "oop-notes-srp-17a682610ca7", title: "[OOP Notes] Single Responsibility Principle (SRP)", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "java-notes-basics-9a7d52e1ba56", title: "[Java notes] Very basics", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "os-notes-fundamentals-a2971dd9066a", title: "[Operating Systems Notes] Fundamentals", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "rest-api-notes-82489a26f3f2", title: "REST API", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "dsa-nodes-linked-lists-26b17cfb711", title: "[DSA notes] Nodes and Linked Lists", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "dsa-hash-map-9c3bac17b525", title: "[DSA notes] Hash map / Hash table", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "dsa-arrays-strings-ce6672182750", title: "[DSA notes] Arrays and Strings", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "dsa-fundamentals-32915ebc1a9d", title: "DATA STRUCTURES AND ALGORITHMS", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "dsa-stacks-queues-f3fd50e6bd1d", title: "[DSA notes] Stacks and Queues", upvotes: 0, upvoteIds: [], comments: [] },
    { name: "runtime-complexity-c5b1f9d928a", title: "Runtime Complexity", upvotes: 0, upvoteIds: [], comments: [] }
];

async function run() {
    try {
        await client.connect();
        const db = client.db('full-stack-react-db');
        const collection = db.collection('articles');

        // Clean out any partial data
        await collection.deleteMany({});
        console.log("Emptying Atlas collection...");

        // Bulk Insert
        await collection.insertMany(articlesToImport);
        console.log(`Successfully imported ${articlesToImport.length} articles to Atlas!`);

    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await client.close();
    }
}

run();