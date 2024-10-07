//checklogin,รับค่าจากlogin(รับจาก axios) ที่นี่
const admin = require('../config/firebase')
const Users = require('../models/Users')


exports.authCheck = async(req,res,next)=>{   
    // console.log('hello middleware',req.headers);
    try{
        const firebaseUser = await admin.auth()
        .verifyIdToken(req.headers.authtoken)//เช็ค token req.headers คือข้อมูลที่ส่งมาจากหน้าบ้าน
        req.user = firebaseUser 
        next()            
    } catch(err){
        console.log(err);  
    }
    
}

exports.teacherCheck = async (req, res, next) => {
    try {
        console.log('good');
        const userTeacher = await Users.findOne({email:req.user.email})
        .exec()
        if(userTeacher.role !== 'teacher'){
            res.status(403).send('Teacher Denied')
        }else{
            next()
        }
        
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

exports.adminCheck = async (req, res, next) => {
    try {
        console.log('good');
        const userAdmin = await Users.findOne({email:req.user.email})
        .exec()
        if(userAdmin.role !== 'admin'){
            res.status(403).send('admin Denied')
        }else{
            next()
        }
        
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};