const attachCookies = (res, token) => {
    const oneDay = new Date(Date.now() + 1000 * 60 * 60 * 24);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: oneDay,
    })
}

export default attachCookies;