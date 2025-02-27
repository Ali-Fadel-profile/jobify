import User from "../model/User.js"
import attachCookies from "../util/attachCookies.js";
const register = async (req, res) => {
    const user = await User.create(req.body);
    const token = user.createJWT();
    attachCookies(res, token);

    res.status(201).json({
        user: {
            name: user.name,
            lastName: user.lastName,
            location: user.location,
            email: user.email,
        },
        userLocation: user.location
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error('Please provide email and password');
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('The user does not exist');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new Error('The password is incorrect');
    }
    const token = user.createJWT();
    attachCookies(res, token)
    user.password = undefined
    res.status(200).json({ user, userLocation: user.location });
}

const updateUser = async (req, res) => {
    const { name, email, lastName, location } = req.body;
    if (!name || !email || !lastName || !location) {
        const error = new Error('Please provide all values');
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
        const error = new Error('The user does not exist');
        error.statusCode = 404;
        throw error;
    }

    user.name = name;
    user.email = email;
    user.lastName = lastName;
    user.location = location;
    await user.save();

    const token = user.createJWT();
    attachCookies(res, token)

    res.status(201).json({
        user: {
            name: user.name,
            lastName: user.lastName,
            location: user.location,
            email: user.email,
        },
        userLocation: user.location
    });
}

const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(200).json({ user, userLocation: user.location });
}

const logout = (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(200).json({ msg: 'user logged out!' });
}

export { register, login, updateUser, getCurrentUser, logout }