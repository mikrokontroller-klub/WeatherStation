const path = require('path');
const chalk = require('chalk');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.loginController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        //TODO: Change to ejs
        res.sendFile(path.join(__dirname, '../views/login.html'));
    },
    /** Handle login logic */
    login: async (req, res) => {
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
            } else {
                console.log(chalk.red('[Auth failed]: '), username);
                req.session.returnTo = req.originalUrl;
                //TODO: Add data to redirect why the login failed
                res.redirect('/login');
            }
            res.end();
        } else {
            console.log('Username or Password not provided for auth');
            req.session.returnTo = req.originalUrl;
            //TODO: Add data to redirect why the login failed
            res.redirect('/login');
        }
    },
    /** Handle logout logic */
    logout: async (req, res) => {
        if (req.session) {
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
        } else {
            res.end();
        }
    },
};
