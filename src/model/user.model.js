/* eslint-disable indent */
// QUERY DB

const db = require('../config/db');

const userModel = {
    selectAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users ORDER BY phone DESC ', (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    // register user
    registerUser: ({ id, username, phone, password, level, image }) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (id, username, phone, password, level, image) 
            VALUES (${id}, '${username}', '${phone}', '${password}', ${level}, '${image}')`, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    // login user
    loginUser: (username) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },

    // update user
    updateUser: ({ id, username, password }) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET username='${username}', password='${password}' WHERE id=${id}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    // delete user
    destroyUser: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    // delete user
    destroyfile: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
};

module.exports = userModel;