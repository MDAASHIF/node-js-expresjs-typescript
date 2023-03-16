/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/posts';


const postRouter = express.Router();
postRouter.get('/', controller.getPosts);
postRouter.get('/:id', controller.getPost);
postRouter.put('/:id', controller.updatePost);
postRouter.delete('/:id', controller.deletePost);
postRouter.post('/', controller.addPost);

export = postRouter;