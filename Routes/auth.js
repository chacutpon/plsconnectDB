const express =require('express')
const router = express.Router()

//controllers
const { createAndUpdateUser,currentUser,listUsers,removeUser } = require('../controllers/auth')


//middleware เป็นการเช็คว่าloginเข้ามาแล้วหรือยังถ้ายังจะไม่ให้ไปทำในส่วนต่อไปคือ controller
const { authCheck,teacherCheck,adminCheck } = require('../middleware/authCheck')

//get ขอข้อมูลจากเซิร์ฟเวอร์
//post ส่งข้อมูลไปยังเซิร์ฟเวอร์ เพื่อสร้างข้อมูลใหม่ อัปเดตข้อมูล หรือลบข้อมูล
//put แก้ไขข้อมูล
//delete ส่ง id มาแล้วลบ

//http://localhost:5000/api/auth จุดนัดพบกับหน้าบ้าน
//เช็ค middleware ก่อนเมื่อผ่านจะไปทำ controller ต่อ
router.post('/auth', authCheck , createAndUpdateUser)


//ใช้งาน currentUser จาก controller
router.post('/current-user', authCheck , currentUser)

//เช็คว่าเป็น teacher ไหมผ่าน path teachercheck
router.post('/current-teacher', authCheck , teacherCheck, currentUser)

//เช็คว่าเป็น admin ไหมผ่าน path admincheck
router.post('/current-admin', authCheck , adminCheck, currentUser)

//เอาไว้แสดงรายชื่อในหน้า admin
router.get("/users-admin", authCheck , adminCheck, listUsers);

//เอาไว้แสดงรายชื่อในหน้า admin
router.get("/users-teacher", authCheck , teacherCheck, listUsers);

//เอาไว้ลบ user
router.delete("/users/:id", authCheck, adminCheck, removeUser);

module.exports = router;