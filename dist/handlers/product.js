"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product_routes = void 0;
const verifyAuthToken_1 = require("../middlewares/verifyAuthToken");
const product_1 = require("../models/product");
// ************************
// PRODUCTS HANDLERS
// ************************
const productsTable = new product_1.ProductsTable();
// INDEX
const index = async (req, res) => {
    try {
        const result = await productsTable.index();
        res.json(result);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// SHOW
const show = async (req, res) => {
    const id = req.body.id;
    try {
        const result = await productsTable.show(id);
        res.json(result);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// CREATE
const create = async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    try {
        const result = await productsTable.create(product);
        res.json(result);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// DELETE
const destroy = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await productsTable.delete(id);
        res.json(result);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
// *******************************
// PRODUCTS ROUTES
// *******************************
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken_1.verifyAuthToken, create);
    app.delete('/products/:id', destroy);
};
exports.product_routes = product_routes;
