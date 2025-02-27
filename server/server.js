import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/errorHandler.js";
import isAuth from "./middleware/is-auth.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
import connectDb from "./db/connectDb.js";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

//  Security Middleware 
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser());
// Custom Headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // ✅ Specific origin
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true"); // ✅ Allow credentials (cookies)
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', isAuth, jobsRouter);

// Static Files 
app.use(express.static(resolve(__dirname, "../client/dist")));

// Catch-All Route for SPA
app.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, "../client/dist", "index.html"));
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
