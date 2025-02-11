const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;
    const apiEndpoint = 'https://api.example.com/chat';
    const apiKey = process.env.API_KEY;

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        res.json({ response: data });
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ response: '对不起，出现了一些问题。' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
