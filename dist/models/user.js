"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersTable = void 0;
const database_1 = __importDefault(require("../database"));
const hash_1 = require("../utils/hash");
class UsersTable {
    // GET ALL USERS
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            return result.rows; // return an array containing all users
        }
        catch (err) {
            console.log(err);
            throw new Error(`unable to get users : ${err}`);
        }
    }
    // GET SINGLE USER
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0]; // return user (first element of the array)
        }
        catch (err) {
            throw new Error(`unable to get user ${id} : ${err}`);
        }
    }
    // CREATE A NEW USER
    async create(user) {
        const { firstname, lastname, password } = user;
        const hashedPassword = (0, hash_1.hash)(password);
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [firstname, lastname, hashedPassword]);
            return result.rows[0]; // return user (first element of the array)
        }
        catch (err) {
            throw new Error(`unable to create user : ${err}`);
        }
    }
    // DELETE A USER
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id = ($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            return result.rows[0]; // return user (first element of the array)
        }
        catch (err) {
            throw new Error(`unable to delete user : ${err}`);
        }
    }
    // AUTHENTICATE
    async authenticate(id, password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE id = ($1)';
        const result = await conn.query(sql, [id]);
        if (result.rows.length) {
            const user = result.rows[0];
            const isVerified = (0, hash_1.compare)(password, user.password);
            if (isVerified)
                return user;
        }
        return null;
    }
}
exports.UsersTable = UsersTable;
