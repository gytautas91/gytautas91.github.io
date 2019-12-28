require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const { analyzeURL } = require('./modules/analyzer/analyzer');


app.use(express.static(path.join(__dirname, '/../build')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/analyze', async function (req, res) {
    try {
        const results = await analyzeURL(req.query.url);
        return res.json(results);
    } catch (e) {
        return res.status(400).json(e);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});

const host = process.env.SERVER_HOST || '127.0.0.1';
const port = process.env.SERVER_PORT || 8080;

app.listen(port, host);
console.log(`Service is running on port: ${host}:${port}`);