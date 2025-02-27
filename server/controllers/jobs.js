import mongoose from "mongoose";
import Job from "../model/Job.js"
import checkPermissions from "../util/checkPermissions.js";
import moment from "moment";
const getAllJobs = async (req, res) => {
    const { status, jobType, search, sort, } = req.query;
    const queryObject = {
        createdBy: req.user.userId,
    }
    if (status && status !== "all") {
        queryObject.status = status;
    }
    if (jobType && jobType !== "all") {
        queryObject.jobType = jobType;
    }
    if (search) {
        queryObject.position = { $regex: search, $options: "i" }
    }

    try {
        let result = Job.find(queryObject);

        if (sort === "latest") {
            result = result.sort("-createdAt");
        }
        if (sort === "oldest") {
            result = result.sort("createdAt")
        }
        if (sort === "a-z") {
            result = result.sort("position")
        }
        if (sort === "z-a") {
            result = result.sort("-position")
        }
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const jobs = await result.skip(skip).limit(limit);
        const totalJobs = await Job.countDocuments(queryObject);
        const numOfPages = Math.ceil(totalJobs / limit)

        res.status(200).json({ jobs, totalJobs, numOfPages })
    } catch (err) {
        const error = new Error('something went wrong, try again later');
        error.status = 500;
        throw error
    }
}
const createJob = async (req, res) => {
    const { company, position, } = req.body;
    if (!company || !position) {
        const error = new Error('Please provide all values');
        error.status = 400;
        throw error;
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(201).json({ job });
}

const deleteJob = async (req, res) => {

    const job = await Job.findOne({ _id: req.params.id });
    if (!job) {
        const error = new Error('no job with that id');
        error.status = 404;
        throw error;
    }
    const jobOwnerId = job.createdBy;
    checkPermissions({ currentUserId: req.user.userId, jobOwnerId: jobOwnerId });

    await job.deleteOne();
    res.status(200).json({ msg: 'Successfully deleted job' });
}

const updateJob = async (req, res) => {
    const { company, position } = req.body;
    const { id: jobId } = req.params;
    if (!company || !position) {
        const error = new Error('Please provide all values');
        error.status = 400;
        throw error;
    }
    const job = await Job.findById(jobId);
    if (!job) {
        const error = new Error('No job with that id');
        error.status = 404;
        throw error;
    }

    checkPermissions({ currentUserId: req.user.userId, jobOwnerId: job.createdBy });

    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true, runValidators: true });
    if (!updateJob) {
        const error = new Error('Field to update job');
        error.satus = 404;
        throw error
    }
    res.status(200).json({ updatedJob });
}

const showStats = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        let stats = await Job.aggregate([
            {
                $match: { createdBy: userId },
            },
            {
                $group: { _id: "$status", count: { $sum: 1 } }
            }
        ]);
        stats = stats.reduce((acc, curr) => {
            const { _id: title, count } = curr;
            acc[title] = count;
            return acc;
        }, {})

        const defaultStats = {
            pending: stats.pending || 0,
            interview: stats.interview || 0,
            declined: stats.declined || 0,
        }

        let monthlyApplications = await Job.aggregate([
            { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
            {
                $group: {
                    _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 6 },
        ]);

        monthlyApplications = monthlyApplications.map((item) => {
            const { _id: { year, month }, count } = item
            const date = moment().month(month - 1).year(year).format('MMM YY')
            return { date, count }
        }).reverse()

        res.status(200).json({ defaultStats, monthlyApplications });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export { createJob, deleteJob, updateJob, getAllJobs, showStats }