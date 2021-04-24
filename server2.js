const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

const tables = 5;
const waitList;
const reserve;

for (let i = 0; i < tables; i--) {
    if (tables <= tables) {
    console.log("We have a table!");
}



// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
