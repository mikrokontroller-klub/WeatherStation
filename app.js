const express = require('express');
const chalk = require('chalk');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.get('/sensors', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/sensors/index.html'));
});

app.get('/sensors/new', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/sensors/new.html'));
});

app.get('/sensors/:id/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/sensors/edit.html'));
});

app.get('/sensors/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/sensors/view.html'));
});

app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/users/index.html'));
});

app.get('/users/new', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/users/new.html'));
});

app.get('/users/:id/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/users/edit.html'));
});

app.get('/users/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/users/view.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(chalk.green('[Server]:'), ` App listening at http://localhost:${port}`);
});
