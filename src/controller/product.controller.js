/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
const productModel = require('../model/product.model');
const { response, responseError } = require('../helper/response.js');
const clientRedis = require('../config/redis')

const userController = {
    // Get all products
    getAllProduct: (req, res) => {
        productModel.selectAll()
            .then((result) => {
                response(res, result.rows, 200, 'get data success');
            })
            .catch((err) => {
                responseError(res, err, 400, 'get data failed');
            });
    },

    // REDIS GET BY ID
    getByID: (req, res) => {
        const id = req.params.id;
        productModel.selectByID(id)
            .then((result) => {
                const dataRedis = clientRedis.set(`getFromRedis/${id}`, JSON.stringify(result), {
                    EX: 180,
                    NX: true,
                })
                res.send({
                    fromCache: false,
                    data: dataRedis
                });
            })
            .catch((err) => {
                responseError(res, err.message, 400, 'get id Failed');
            });
    },

    // pagination
    paginate: async (req, res) => {
        const { limit, page } = req.query;
        const pageValue = page ? Number(page) : 1;
        const limitValue = limit ? Number(limit) : 2;
        const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

        // total page & total data
        const allData = await productModel.selectPaginate();
        console.log(allData);
        const totalData = Number(allData.rows[0].total);

        productModel.paginate(limitValue, offsetValue)
            .then((result) => {
                const pagination = {
                    currentPage: pageValue,
                    dataperPage: limitValue,
                    totalPage: Math.ceil(totalData / limitValue),
                    totalData
                }
                res.json({
                    message: 'data berhasil masuk',
                    result: pagination
                })
            })
            .catch((err) => {
                responseError(res, err, 400, 'get data failed');
            });
    },

    // add product
    addProduct: (req, res) => {
        const { name, description, owner, video } = req.body;
        const data = {
            name,
            description,
            owner,
            video
        };
        productModel.addProducts(data)
            .then((result) => {
                response(res, result.rows, 201, 'Insert product Success');
            })
            .catch((err) => {
                responseError(res, err.message, 400, 'Insert product Failed');
            });
    },

    // update users
    updateProduct: (req, res) => {
        const id = req.params.id;
        const { name, description } = req.body;
        const data = {
            id,
            name,
            description
        };
        productModel.updateProducts(data)
            .then((result) => {
                response(res, result.rows, 200, 'Update product Success');
            })
            .catch((err) => {
                responseError(res, err.message, 400, 'Update product Failed');
            });
    },

    // delete products
    destroyProduct: (req, res) => {
        const id = req.params.id;
        productModel.destroyProducts(id)
            .then((result) => {
                response(res, result.rows, 200, 'Delete product Success');
            })
            .catch((err) => {
                responseError(res, err.message, 400, 'Delete product Failed');
            });
    }
}

module.exports = userController;