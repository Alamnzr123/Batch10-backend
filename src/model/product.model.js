/* eslint-disable indent */
// QUERY DB

const db = require('../config/db');

const userModel = {
    selectAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM products ORDER BY name DESC ', (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    selectByID: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM products WHERE id=${id}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    selectPaginate: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS total FROM users', (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    // pagination
    paginate: (limit, offset) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset} `, (err, res) => {
                if (err) {
                    reject(err);
                }

                resolve(res);
            });
        })
    },

    // register user
    addProducts: ({ name, description, owner, video }) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO products (name, description, owner, video) 
            VALUES ('${name}', '${description}', '${owner}', '${video}')`, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    // update products
    updateProducts: ({ name, description }) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE products SET name='${name}', description='${description}' WHERE id`, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    // delete product
    destroyProducts: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM products WHERE id=${id}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
};

module.exports = userModel;