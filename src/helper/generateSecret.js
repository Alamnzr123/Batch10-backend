require('dotenv').config();
const jwt = require('jsonwebtoken');
const tokenData = process.env.JWT_SECRET;

const generateToken = async (payload) => {
    const token = await jwt.sign(payload, tokenData, { expiresIn: '1h' });
    console.log(token);
    return token;
}

const refreshToken = async (payload) => {
    const refreshtoken = await jwt.sign(payload, tokenData, { expiresIn: '2h' });
    console.log(refreshtoken);
    return refreshtoken;
}


module.exports = {
    generateToken,
    refreshToken
}