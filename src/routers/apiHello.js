const Route = require('express').Router();

Route.get('/',(req,res)=>{
    res.send(
        {
            status:1,
            message:'API is running.'
        }
    )

})
module.exports = Route