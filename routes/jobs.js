import { Router } from "express";
import { createJob, deleteJob, updateJob, getAllJobs, showStats } from "../controllers/jobs.js";
const jobsRouter = Router();

jobsRouter.get("/", getAllJobs);
jobsRouter.post("/create", createJob);
jobsRouter.delete("/:id", deleteJob);
jobsRouter.patch("/:id", updateJob);
jobsRouter.get("/stats", showStats)

export default jobsRouter