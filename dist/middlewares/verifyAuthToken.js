"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const token_1 = require("../utils/token");
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(" ")[1];
            const isVerified = (0, token_1.verifyToken)(token);
            if (!isVerified) {
                res.status(401).json("Not authorized");
                return;
            }
        }
        else {
            res.status(401).json("Please provide an auth token");
            return;
        }
    }
    catch (err) {
        res.status(401).json(err);
    }
    next();
};
exports.verifyAuthToken = verifyAuthToken;
