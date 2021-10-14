const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { routes } = require('./routers/routes');
const app = express();

app.use(express.static('public'));

//TODO: Move to controller
app.get('/', (req, res) => {
    if (req.session && req.session.loggedin) {
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});

/**
 * General purpose application routes
 */
app.use(routes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(chalk.green('[Server]:'), ` App listening at http://localhost:${port}`);
});
