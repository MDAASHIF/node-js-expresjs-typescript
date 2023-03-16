import express from 'express';
import controller from '../controllers/user';

const userRouter = express.Router();

userRouter.post('/', controller.addUser);

export = userRouter;