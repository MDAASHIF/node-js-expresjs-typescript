"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const userRouter = express_1.default.Router();
userRouter.post('/', user_1.default.addUser);
module.exports = userRouter;
