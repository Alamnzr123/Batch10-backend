/* eslint-disable indent */
// /* eslint-disable indent */
// // PANGGIL DEPEDENCY/PACKAGE
// const express = require('express');
// const bodyParser = require('body-parser');

// const a = ''

// const app = express();
// app.use(bodyParser.json());

// // // API
// // app.get('/', (req, res) => {
// //     console.log(req);
// // })

// // // GET PARAMS
// // app.get('/latihan-param/:id', (req, res) => {
// //     const urlParam = req.params.id;
// //     res.json({
// //         urlParam
// //     })
// //     console.log(`id ${urlParam}`);
// // })


// // GET QUERY PARAMS

// // app.get('/latihan-query', (req, res) => {
// //     const queryParams = req.query
// //     res.json({
// //         queryParams
// //     })
// //     console.log(`query ${queryParams}`)
// // })

// // GET HEADERS
// // app.get('/latihan-header', (req, res) => {
// //     const dataHeader = req.headers
// //     const { token } = dataHeader
// //     res.json({
// //         token
// //     })
// //     console.log(`token anda ${token}`);
// // })

// // POST BODY
// app.post('/latihan-post', (req, res) => {
//     const body = req.body;
//     res.json({
//         body
//     });
//     console.log(`Data ini ${body}`);
// });

// // JALANKAN SERVER
// app.listen(4000, () => {
//     console.log('Server Listening on PORT 4000');
// });

const express = require('express');
const bodyParser = require('body-parser'); //ISI DATA DARI POSTMAN
const helmet = require('helmet');
const cors = require('cors');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
// router
const userRouter = require('./src/router/user.router');
const productRouter = require('./src/router/product.router');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan());
app.use(helmet());
app.use(userRouter);
app.use(productRouter);
// app.use(express.static('public'));

// app.get('/latihan-header', (req, res) => {
//     // const dataHeader = req.headers;
//     // const { token } = dataHeader;
//     // res.json({
//     //     token
//     // })
//     // console.log(`token anda ${token}`);

//     var html = xss('<script>alert("xss");</script>');
//     console.log(html);

// })

app.listen(port, () => {
    console.log(`SERVER LISTEN ON PORT ${port}`);
});
