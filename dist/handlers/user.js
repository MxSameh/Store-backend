"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_routes = void 0;
const user_1 = require("../models/user");
const token_1 = require("../utils/token");
const verifyAuthToken_1 = require("../middlewares/verifyAuthToken");
// ************************
// USER HANDLERS
// ************************
const usersTable = new user_1.UsersTable();
// INDEX
const index = async (req, res) => {
    try {
        const users = await usersTable.index();
        res.json(users);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// SHOW
const show = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await usersTable.show(id);
        if (result)
            res.json(result);
        else
            res.json('user not found');
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// CREATE 
const create = async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    try {
        const newUser = await usersTable.create(user);
        const token = (0, token_1.createToken)(newUser);
        res.json(token);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// DELETE
const destroy = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await usersTable.delete(id);
        res.json(result);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// AUTHENTICATE
const authenticate = async (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    try {
        const result = await usersTable.authenticate(id, password);
        const token = (0, token_1.createToken)(result);
        res.json(token);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// *******************************
// USERS ROUTES
// *******************************
const user_routes = (app) => {
    app.get('/users', verifyAuthToken_1.verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken_1.verifyAuthToken, show);
    app.post('/users', create);
    app.delete('/users/:id', verifyAuthToken_1.verifyAuthToken, destroy);
    app.post('/users/authenticate', authenticate);
};
exports.user_routes = user_routes;
