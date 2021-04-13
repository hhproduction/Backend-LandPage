const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
// const pagination = require ('./middlewares/pagination)

const app = express()

//Middleware

app.use(bodyParser.json())
app.use(cors())
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
})
app.use(morgan('combined',{stream: accessLogStream}))
// app.use(pagination)
app.use((req,res,next)=>{
    console.log('-----------------------------------');
    console.log('req',req.method,req.originalUrl);
    console.log('body: ',req.body);
    console.log('params: ',req.params);
    console.log('query: ',req.query);
    next();
})

//Router
const auth = require('./routers/auth')
const parameterRouter = require('./routers/parameter')
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/product')
const orderRouter = require('./routers/order')
const accountRouter = require('./routers/account')
const customerRouter = require('./routers/customer')
const orderDetailRouter = require('./routers/orderDetail')

app.use('/api/v1/auth',auth)
app.use('/api/v1/parameter', parameterRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/account', accountRouter);
app.use('api/v1/customer',customerRouter);
app.use('api/v1/orderDetail',orderDetailRouter)

//Listen
const PORT = process.env.API_PORT;
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`API running at ${PORT}`);
    }
})