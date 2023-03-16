"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/** source/routes/posts.ts */
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("../controllers/posts"));
const postRouter = express_1.default.Router();
postRouter.get('/', posts_1.default.getPosts);
postRouter.get('/:id', posts_1.default.getPost);
postRouter.put('/:id', posts_1.default.updatePost);
postRouter.delete('/:id', posts_1.default.deletePost);
postRouter.post('/', posts_1.default.addPost);
module.exports = postRouter;
