const express = require('express');
const chalk = require('chalk');
const { routes } = require('./routers/routes');
const { apiRoutes } = require('./routers/routesApi');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const { baseController } = require('./controllers/baseController');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/app');

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

app.use('/api', apiRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(chalk.green('[Server]:'), ` App listening at http://localhost:${port}`);
});
