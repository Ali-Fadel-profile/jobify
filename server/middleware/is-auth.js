import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    } catch (err) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
}
export default isAuth