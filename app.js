const express = require('express');
const chalk = require('chalk');
const { routes } = require('./routers/routes');
const session = require('express-session');
const { baseController } = require('./controllers/baseController');
const app = express();

app.use(express.static('public'));

app.use(
    session({
        secret: 'secret', //TODO: Read secret from .env file
        resave: true,
        saveUninitialized: true,
        //cookie: { secure: true },
    })
);

app.get('/', baseController.index);

/**
 * General purpose application routes
 */
app.use(routes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(chalk.green('[Server]:'), ` App listening at http://localhost:${port}`);
});
