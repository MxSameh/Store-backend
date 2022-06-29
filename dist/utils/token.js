"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET;
// CREATE A NEW TOKEN
const createToken = (data) => {
    const token = jsonwebtoken_1.default.sign({ data: data }, secret);
    return token;
};
exports.createToken = createToken;
// VERIFY A TOKEN
const verifyToken = (token) => {
    try {
        jsonwebtoken_1.default.verify(token, secret);
        return true;
    }
    catch {
        return false;
    }
};
exports.verifyToken = verifyToken;
