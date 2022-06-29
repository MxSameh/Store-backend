"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_routes = void 0;
const verifyAuthToken_1 = require("../middlewares/verifyAuthToken");
const order_1 = require("../models/order");
// ************************
// USER HANDLERS
// ************************
const ordersTable = new order_1.OrdersTable();
// INDEX
const index = async (req, res) => {
    try {
        const result = await ordersTable.index();
        res.json(result);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// SHOW
const show = async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await ordersTable.show(userId);
        res.json(result);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// CREATE
const create = async (req, res) => {
    const order = {
        userId: req.body.userId,
        status: req.body.status
    };
    try {
        const result = await ordersTable.create(order);
        res.json(result);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// DESTROY
const destroy = async (req, res) => {
    const id = req.body.id;
    try {
        const result = await ordersTable.delete(id);
        res.json(result);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// ADD TO PRODUCT
const addProduct = async (req, res) => {
    const orderId = req.params.id;
    const { productId, quantity } = req.body;
    try {
        const result = await ordersTable.addProduct(quantity, orderId, productId);
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
// *******************************
// USERS ROUTES
// *******************************
const order_routes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:userId', verifyAuthToken_1.verifyAuthToken, show);
    app.post('/orders', create);
    app.delete('/orders/:id', destroy);
    app.post('/orders/:id/products', addProduct);
};
exports.order_routes = order_routes;
