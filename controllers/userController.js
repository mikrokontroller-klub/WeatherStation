const Users = require('../models/user');
const generateApiToken = require('../utils/generateApiToken');
const bcrypt = require('bcrypt');
const chalk = require('chalk');

/**
 * @description Resourceful controller for the users
 */
exports.userController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        let users = await Users.find({}).select('-password');
        res.render('pages/users/index', { activePage: 'users', users });
    },

    /** Show the form for creating a new resource. */
    create: async (req, res) => {
        res.render('pages/users/new', { activePage: 'users' });
    },

    /** Store a newly created resource in storage. */
    store: async (req, res) => {
        if (req.body.username && req.body.password) {
            let user = new Users({
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, 10),
                apiToken: generateApiToken(),
            });
            await user.save();
            res.redirect('/users');
        } else {
            console.log(chalk.yellow('[Create User]:'), ' Missing username or password');
            res.redirect('/users/new');
        }
    },

    /** Display the specified resource. */
    show: async (req, res) => {
        let user = await Users.findOne({
            _id: req.params.id,
        }).select('-password');
        res.render('pages/users/view', { activePage: 'users', user });
    },

    /** Show the form for editing the specified resource. */
    edit: async (req, res) => {
        let user = await Users.findOne({
            _id: req.params.id,
        }).select('-password');
        res.render('pages/users/edit', { activePage: 'users', user });
    },

    /** Update the specified resource in storage. */
    update: async (req, res) => {
        //TODO: Update sensor in DB
        if (req.body.username && req.body.password) {
            try {
                await Users.findByIdAndUpdate(req.params.id, {
                    username: req.body.username,
                    password: await bcrypt.hash(req.body.password, 10),
                });
            } catch (e) {
                console.log(chalk.red('[Update User]:'), e);
                res.redirect(`/users/${req.params.id}/edit`);
            }
            res.redirect('/users');
        } else {
            console.log(chalk.yellow('[Update User]:'), ' Missing username or password');
            res.redirect(`/users/${req.params.id}/edit`);
        }
    },

    /** Remove the specified resource from storage. */
    destroy: async (req, res) => {
        let user = await Users.findOne({ username: req.session.username });

        if (req.params.id && req.params.id !== user.id) {
            await Users.findByIdAndDelete(req.params.id);
            res.redirect('/users');
        } else {
            console.log(chalk.yellow('[Delete User]:'), ' You can not delete yourself');
            res.redirect('/users');
        }
    },

    generateToken: async (req, res) => {
        let user = await Users.findById(req.params.id);
        user.apiToken = generateApiToken();
        await user.save();
        res.redirect(`/users/${req.params.id}/edit`);
    },
};
