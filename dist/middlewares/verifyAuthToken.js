"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const token_1 = require("../utils/token");
const verifyAuthToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    const isVerified = (0, token_1.verifyToken)(token);
    if (!isVerified) {
        res.status(401).json('Not authorized');
        return;
    }
    next();
};
exports.verifyAuthToken = verifyAuthToken;
