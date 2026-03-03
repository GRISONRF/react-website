import express from 'express';

const articleInfo = [
    { name: 'learn-node', upvotes: 0},
    { name: 'learn-react', upvotes: 0},
    { name: 'mongodb', upvotes: 0},
]

const app = express();

app.use(express.json());

app.post('/api/articles/:name/upvote', (req, res) => {
    const article = articleInfo.find(a => a.name === req.params.name);
    article.upvotes += 1;

    res.send('Success! The article ' + article.name + ' now has ' + article.upvotes + ' upvotes.');

})

// app.get('/hello', function(req, res) {
//     res.send('Hello from a GET endpoint!');
// });

// app.get('/hello/:name', function(req, res) {
//     res.send('Hello, ' + req.params.name + '! This is a GET endpoint with a parameter.');
// });

// app.post('/hello', function(req, res) {
//     res.send('Hello, ' + req.body.name + '! This is a POST endpoint.');
// });

app.listen(8000, function() {
    console.log('Server is listening on port 8000.');
});