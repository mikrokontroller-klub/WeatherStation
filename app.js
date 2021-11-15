const express = require('express');
const chalk = require('chalk');
const { routes } = require('./routers/routes');
const { apiRoutes } = require('./routers/routesApi');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const expressValidator = require('express-validator');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { baseController } = require('./controllers/baseController');
const app = express();
const connectDB = require('./utils/connectDB');
app.use(bodyParser());
app.use(methodOverride('_method'));
app.use(expressValidator());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/app');

connectDB('weatherStation');

app.use(
    session({
        secret: 'secret', //TODO: Read secret from .env file
        resave: true,
        saveUninitialized: true,
        //cookie: { secure: true },
    })
);
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

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
