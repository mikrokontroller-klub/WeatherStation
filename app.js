const express = require('express');
const chalk = require('chalk');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/template.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(chalk.green('[Server]:'), ` App listening at http://localhost:${port}`);
});
