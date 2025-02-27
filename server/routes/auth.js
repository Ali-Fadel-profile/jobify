import { Router } from "express";
import { rateLimit } from 'express-rate-limit'
import { register, login, updateUser, getCurrentUser, logout } from '../controllers/auth.js';
import isAuth from "../middleware/is-auth.js";
const authRouter = Router();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 15,
    message: "Too many requests. Please try again in after 15 mintues"
})
authRouter.post('/register', apiLimiter, register);
authRouter.post('/login', apiLimiter, login);
authRouter.patch('/updateUser', isAuth, updateUser);
authRouter.get('/getCurrentUser', isAuth, getCurrentUser);
authRouter.get('/logout', logout);

export default authRouter;