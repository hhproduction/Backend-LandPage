const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const pagination = require('./src/middlewares/pagination')
const { errorHandle } = require('./src/middlewares/errorHandle')
const app = express()

//Middleware

app.use(bodyParser.json())
app.use(cors())
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
})
app.use(morgan('combined', { stream: accessLogStream }))
app.use(pagination)
app.use((req, res, next) => {
    console.log('-----------------------------------');
    console.log('req', req.method, req.originalUrl);
    console.log('body: ', req.body);
    console.log('params: ', req.params);
    console.log('query: ', req.query);
    next();
})

//Router
const authAdmin = require('./src/routers/auth')
const authCustomer = require('./src/routers/authCustomer')
const parameterRouter = require('./src/routers/parameter')
const categoryRouter = require('./src/routers/category')
const productRouter = require('./src/routers/product')
const orderRouter = require('./src/routers/order')
const accountRouter = require('./src/routers/account')
const customerRouter = require('./src/routers/customer')
// const orderDetailRouter = require('./src/routers/orderDetail')
const provinceRouter = require('./src/routers/province')
const districtRouter = require('./src/routers/district')
const producerRouter = require('./src/routers/producer')
const newsRouter = require('./src/routers/news')
const discountRouter = require('./src/routers/discount')
const helloRouter = require('./src/routers/hello')
const apiHelloRouter = require('./src/routers/apiHello')


app.use('/', helloRouter, errorHandle)
app.use('/api/v1', apiHelloRouter, errorHandle)
app.use('/api/v1/auth_admin', authAdmin, errorHandle);
app.use('/api/v1/auth_customer', authCustomer, errorHandle);
app.use('/api/v1/parameter', parameterRouter, errorHandle);
app.use('/api/v1/category', categoryRouter, errorHandle);
app.use('/api/v1/product', productRouter, errorHandle);
app.use('/api/v1/order', orderRouter, errorHandle);
app.use('/api/v1/admin', accountRouter, errorHandle);
app.use('/api/v1/customer', customerRouter, errorHandle);
// app.use('/api/v1/orderDetail', orderDetailRouter);
app.use('/api/v1/province', provinceRouter, errorHandle);
app.use('/api/v1/district', districtRouter, errorHandle);
app.use('/api/v1/producer', producerRouter, errorHandle);
app.use('/api/v1/news', newsRouter, errorHandle)
app.use('/api/v1/discount', discountRouter, errorHandle);

// app.use((req, res, next) => {
//     res.status(404).send({
//         status:404,
//         error:'Not Found'
//     })
// })

//Listen ahihi
const PORT = process.env.PORT || 8081;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`API running at ${PORT}`);
    }
})