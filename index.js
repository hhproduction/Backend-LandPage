const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const pagination = require('./src/middlewares/pagination')

const app = express()

//Middleware

// app.use('/uploads',express.static(path.resolve(__dirname,'./src/uploads')))
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
const helloRouter= require('./src/routers/hello')
const apiHelloRouter = require('./src/routers/apiHello')

app.use('/',helloRouter)
app.use('/api/v1',apiHelloRouter)
app.use('/api/v1/auth_admin', authAdmin);
app.use('/api/v1/auth_customer', authCustomer);
app.use('/api/v1/parameter', parameterRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/admin', accountRouter);
app.use('/api/v1/customer', customerRouter);
// app.use('/api/v1/orderDetail', orderDetailRouter);
app.use('/api/v1/province', provinceRouter);
app.use('/api/v1/district', districtRouter);
app.use('/api/v1/producer', producerRouter);
app.use('/api/v1/news', newsRouter)
app.use('/api/v1/discount', discountRouter)
//Listen ahihi
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`API running at ${PORT}`);
    }
})