const path = require('path');
const chalk = require('chalk');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../utils/error');

exports.loginController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        //TODO: Change to ejs
        res.sendFile(path.join(__dirname, '../views/login.html'));
    },
    /** Handle login logic */
    login: async (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            //TODO: Get user credentials from Mongo
            let user = await User.findOne({ username: username });

            if (user && (await bcrypt.compare(req.body.password, user.password))) {
                req.session.loggedin = true;
                req.session.username = username;
                console.log(chalk.green('[Authenticated]: '), username);
                res.redirect('/home');
                next(req, res);
            } else {
                console.log(chalk.red('[Auth failed]: '), username);
                req.session.returnTo = req.originalUrl;
                //TODO: Add data to redirect why the login failed
                //res.redirect('/login');
                next(new ErrorHandler(401, 'Invalid username or password'));
            }
            res.end();
        } else {
            req.session.returnTo = req.originalUrl;
            next(new ErrorHandler(400, 'Username and password are required'));
            //TODO: Add data to redirect why the login failed
            //res.redirect('/login');
        }
    },
    /** Handle logout logic */
    logout: async (req, res, next) => {
        if (req.session && req.session.loggedin) {
            console.log(chalk.green('[Logged out]: '), req.session.username);
            req.session.destroy((err) => {
                if (err) {
                    //TODO: Send status in redirect
                    res.status(400).redirect('/login');
                } else {
                    //TODO: Send status in redirect
                    res.redirect('/login');
                }
            });
            req.session = undefined;
        } else {
            res.end();
        }
        next(req, res);
    },
};
