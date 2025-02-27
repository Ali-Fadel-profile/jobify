import { mongoose } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true,
            maxLength: [30, "Name cannot exceed 30 characters"],
            minLength: [3, "Name should have more than 2 characters"],
        },
        lastName: {
            type: String,
            required: false,
            trim: true,
            maxLength: [30, "Last name cannot exceed 30 characters"],
            minLength: [3, "Last name should have more than 3 characters"],
            default: "last name",
        },
        location: {
            type: String,
            required: false,
            trim: true,
            maxLength: [30, "Location cannot exceed 30 characters"],
            minLength: [3, "Location should have more than 3 characters"],
            default: "my city",
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: [true, "Email already exists"],
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minLength: [8, "Password should be greater than 8 characters"],
            select: false,
        },
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}


userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

export default mongoose.model("User", userSchema);