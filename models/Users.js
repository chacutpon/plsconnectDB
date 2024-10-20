const mongoose = require("mongoose")
const admin = require('../config/firebase')

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true //หมายถึงค่านี้ห้ามว่างถ้าว่างจะ error
    },
    role:{
        type: String,
        default: 'user',
    },
   
},{timestamps: true}) //จะโชว์ created,updated


module.exports = mongoose.model('Users',userSchema) //(ชื่อโมเดล,schema)
