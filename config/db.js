const mongoose = require('mongoose')
const connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_NAME)
        console.log('Connected To Database!!');
        
    }catch(err){
        console.log(err);      
    }
}

module.exports = connectToDB