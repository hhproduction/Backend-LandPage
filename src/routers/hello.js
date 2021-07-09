const Route = require('express').Router();

Route.get('/',(req,res)=>{
    res.send(
        {
            status:1,
            message:'HELLO API HIEU WUANG.'
        }
    )

})
module.exports = Route