// const Auth = (req, res, next) => {
//   const { token } = req.headers;

//   if (token && token === '123') {
//     next()
//   }
//   else {
//     res.json({
//       message: 'Invalid token'
//     })
//   }

// }

// module.exports = Auth;


require('dotenv').config();
const jwt = require('jsonwebtoken');
const dataToken = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers;
    const decode = jwt.verify(token, dataToken);

    //request custom
    req.APP_DATA = {
      tokenDecode: decode
    }

    next()
  }
  catch (err) {
    res.json({
      message: err.message
    })
  }

}