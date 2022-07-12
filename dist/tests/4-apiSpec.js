"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const token_1 = require("../utils/token");
const request = (0, supertest_1.default)(server_1.default);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyNSwiZmlyc3RuYW1lIjoiQWhtZWQiLCJsYXN0bmFtZSI6IlNhaWQiLCJwYXNzd29yZCI6IiQyYiQxMCRKQjREMzVYakJXNGE0L04yQnFIUTB1MS5laGs2Ly5IUEpycVZLOWpldmhCcmRHZDRsY3RQMiJ9LCJpYXQiOjE2NTYxODg1ODV9.yT1yez1vI5cjm22MN6VOVHLssvOryAcz63QLLT6ryAk';
const auth = `Bearer ${token}`;
describe('User API tests', () => {
    it('index should return all users', async () => {
        const response = await request.get('/users').set("Authorization", auth);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });
    it('create should create a new user', async () => {
        const user = {
            firstname: 'mohamed',
            lastname: 'sameh',
            password: 'pass'
        };
        const response = await request.post('/users').set("Authorization", auth).send(user);
        const isVerified = (0, token_1.verifyToken)(response.body);
        expect(isVerified).toBeTrue();
    });
});
