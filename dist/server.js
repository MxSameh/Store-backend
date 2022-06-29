"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const order_1 = require("./handlers/order");
const product_1 = require("./handlers/product");
const user_1 = require("./handlers/user");
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('WELCOME TO THE STORE');
});
(0, user_1.user_routes)(app);
(0, order_1.order_routes)(app);
(0, product_1.product_routes)(app);
app.listen(port, () => {
    console.log(`Server started: http://localhost:${port}`);
});
