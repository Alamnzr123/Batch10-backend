const express = require('express');

const { list, constohxss, postRegister, login, updateUser, destroyUser, refreshToken } = require('../controller/user.controller');
const router = express.Router();
const { register } = require('../helper/joiResponse');
const { validate } = require('../middleware/validationMiddleware');
// jwt
const auth = require('../middleware/staticAuth');
// authorization
const { isAdmin, isCustomer } = require('../middleware/authorization');
// multer
const upload = require('../middleware/upload')
router.get('/xss', constohxss);

// // Get all users
// router.get('/user', auth, isCustomer, list);
router.get('/user', list);
// Register
router.post('/register', upload, postRegister);
// login
router.post('/login', login);
// update
router.put('/update/:id', updateUser);
// delete
router.post('/destroy/:id', destroyUser);

// refresh-token
router.get('/refresh-token', refreshToken);

module.exports = router;