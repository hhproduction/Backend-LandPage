const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const pagination = require('./middlewares/pagination')

const app = express()

//Middleware

app.use('/uploads',express.static(path.resolve(__dirname,'./uploads')))
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
const authAdmin = require('./routers/auth')
const authCustomer = require('./routers/authCustomer')
const parameterRouter = require('./routers/parameter')
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/product')
const orderRouter = require('./routers/order')
const accountRouter = require('./routers/account')
const customerRouter = require('./routers/customer')
const orderDetailRouter = require('./routers/orderDetail')
const provinceRouter = require('./routers/province')
const districtRouter = require('./routers/district')
const producerRouter = require('./routers/producer')

app.use('/api/v1/auth_admin', authAdmin);
app.use('/api/v1/auth_customer', authCustomer);
app.use('/api/v1/parameter', parameterRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/admin', accountRouter);
app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/orderDetail', orderDetailRouter);
app.use('/api/v1/province', provinceRouter);
app.use('/api/v1/district', districtRouter);
app.use('/api/v1/producer', producerRouter);

//Listen
const PORT = process.env.API_PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`API running at ${PORT}`);
    }
})