const express =require('express')
const router = express.Router()


router.get('/product',(req,res)=>{
    res.send('hello product plsconnect')
})

module.exports = router;