import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide a company."],
        trim: true,
        maxLength: [50, "Company cannot exceed 50 characters"],
        minLength: [3, "Company should have more than 2 characters"],
    },
    position: {
        type: String,
        required: [true, "Please provide your position."],
        trim: true,
        maxLength: [50, "Position cannot exceed 50 characters"],
        minLength: [3, "Position should have more than 2 characters"],
    },
    jobLocation: {
        type: String,
        required: [true, "Please provide your position."],
        trim: true,
        maxLength: [50, "Location cannot exceed 50 characters"],
        minLength: [3, "Location should have more than 3 characters"],
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending"
    },
    jobType: {
        type: String,
        enum: ["full-time", "part-time", "remote", "internship"],
        default: "full-time"
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user."],
    }
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);