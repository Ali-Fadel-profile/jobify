import { readFile } from "fs/promises"; // Use the Promises API
import dotenv from 'dotenv';
dotenv.config();

import connectDb from "./db/connectDb.js";
import Job from "./model/Job.js";

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URL);

        // Read file with await (now using promises)
        const jsonProducts = JSON.parse(await readFile(new URL("./MOCK_DATA.json", import.meta.url), "utf-8"));

        await Job.create(jsonProducts);
        console.log("created!!!");
        process.exit(0);
    } catch (error) {
        console.log("failed!!!");
        console.log(error);
    }
};

start();
