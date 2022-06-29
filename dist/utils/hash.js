"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const salt = parseInt(process.env.SALT);
const peper = process.env.PEPER;
const hash = (password) => {
    const hashedPassword = bcrypt_1.default.hashSync(password + peper, salt);
    return hashedPassword;
};
exports.hash = hash;
const compare = (password, hashedPassword) => {
    const verified = bcrypt_1.default.compareSync(password + peper, hashedPassword);
    return verified;
};
exports.compare = compare;
