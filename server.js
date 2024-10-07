//import
const express = require('express') //express ตัวที่ทำให้ javasciprt เปลี่ยนจาก client เป็น server
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser') //เป็นตัวที่ส่งข้อมูลผ่าน method post ไม่ลงจะส่งไม่ได้
require('dotenv').config();
const { readdirSync } = require('fs')


//DatabaseMongo
const connectToDB = require('./config/db')
connectToDB()

//app
const app = express();


//middleware
app.use(morgan("dev")) //คือบอกว่ามีการrequestมาจะแจ้งเตือนในฝั่งหลังบ้าน
app.use(bodyParser.json({limit: '20mb'}))
app.use(cors())



//Routes auto
readdirSync('./Routes').map((r)=>{
    app.use('/api',require('./Routes/'+r)) //เป็นการloppหน้าrouteเพื่อไม่ให้รกหน้าserver
    
})
    


//Runserver
const port = 5000
app.listen(port,()=>{
    console.log('Server is running on port'+port);
    
})