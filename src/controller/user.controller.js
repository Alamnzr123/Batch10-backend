/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
const userModel = require('../model/user.model');
const { response } = require('../helper/response.js');
const bcrypt = require('bcrypt');
const { generateToken, refreshToken } = require('../helper/generateSecret');
const path = require('fs-extra');
// token
require('dotenv').config();
const jwt = require('jsonwebtoken');
const tokenData = process.env.JWT_SECRET;



const userController = {
    // Get all user
    list: (req, res) => {
        userModel.selectAll()
            .then((result) => {
                response(res, result.rows, 200, 'get data berhasil');
            })
            .catch((err) => {
                response(res, err, 400, 'data error');
            });
    },

    constohxss: (req, res) => {
        const query = req.query;
        res.send(query);
    },

    // Register user
    postRegister: async (req, res) => {
        const { id, username, phone, password, level } = req.body;
        // const image = req.file.path;
        console.log(req.file);
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.json({
                    message: 'Failed hash password'
                });
            }
            const data = {
                id,
                username,
                phone,
                password: hash,
                level
            };
            userModel.registerUser(data)
                .then((result) => {
                    res.json({
                        message: 'register berhasil',
                        data: result
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });
        })
    },

    // Login users
    login: async (req, res) => {
        const { id, username, password } = req.body;
        userModel.loginUser(username)
            .then((data) => {
                const userAuth = data.rows[0].level;
                if (data.rowCount > 0) {
                    bcrypt.compare(password, data.rows[0].password)
                        .then(async (result) => {
                            if (result) {
                                // token
                                const token = await generateToken({
                                    username: result.rows,
                                    level: userAuth
                                });

                                // refresh-token
                                const tokenRefresh = await refreshToken({
                                    username: result.rows,
                                    level: userAuth
                                })
                                res.cookie(tokenRefresh);
                                res.json({
                                    message: 'OK',
                                    token,
                                    tokenRefresh
                                });
                                console.log(res);
                            }
                            else {
                                res.json({
                                    message: 'gagal'
                                });
                            }
                        })
                }
                else {
                    res.json({
                        message: 'email atau password salah',
                        data
                    });
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    },

    // update users
    updateUser: (req, res) => {
        const id = req.params.id;
        const { username, password } = req.body;
        const data = {
            id,
            username,
            password
        };
        userModel.updateUser(data)
            .then((result) => {
                res.json({
                    message: 'update berhasil',
                    data: result
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    },

    // delete users
    destroyUser: async (req, res) => {
        const id = req.params.id;

        // get image
        userModel.selectAll()
            .then((data) => {

            })

        path.unlinkSync(`./public/${id}`);
        userModel.destroyUser(id)
            .then((result) => {
                res.json({
                    message: 'delete berhasil',
                    data: result
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    },

    // refresh-token
    refreshToken: async (req, res) => {
        try {
            const tokenRefresh = req.headers;
            console.log(tokenRefresh);
            if (!tokenRefresh) {
                res.json({ message: 'Token refresh not available' })
            }
            const verifytoken = jwt.verify(tokenRefresh, tokenData, (err, decoded) => {
                if (!err) {
                    res.json({ message: 'Token refresh failed' })
                }
                const accessToken = jwt.sign(
                    { id, username, password },
                    tokenData,
                    {
                        expiresIn: "1d",
                    }
                );
                res.json({ message: 'Refresh token success', accessToken });
            });
            console.log(verifytoken);

        }
        catch (err) {
            res.json({
                message: err.message
            })
        }
    }
}

module.exports = userController;