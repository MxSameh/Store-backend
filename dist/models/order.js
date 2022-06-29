"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersTable = void 0;
const database_1 = __importDefault(require("../database"));
class OrdersTable {
    // GET ALL ORDERS
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable to get orders : ${err}`);
        }
    }
    // GET A SINGLE USER ORDERS
    async show(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = ($1)';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unable to get orders of user ${userId} : ${err}`);
        }
    }
    // CREATE A NEW ORDER
    async create(order) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [order.userId, order.status]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unabe to create a new order : ${err}`);
        }
    }
    // DELETE AN ORDER
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM orders WHERE id = ($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`unabe to delete order ${id} : ${err}`);
        }
    }
    // ADD PRODUCT TO AN ORDER
    async addProduct(quantity, orderId, productId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`couldn't add product to the order fail: ${err}`);
        }
    }
}
exports.OrdersTable = OrdersTable;
