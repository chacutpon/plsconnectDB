//ทำงานทุกอย่างที่นี่ controller

const Users =require('../models/Users')



exports.createAndUpdateUser = async (req, res) => {
    try {
        const { name, email } = req.user;
        // ตรวจสอบข้อมูล
        if (!name || !email) {
            return res.status(400).json({ message: "Missing name or email" });
        }

        let role = 'user'; 

        //check ใครเป็นอาจาร
        const teacherEmailRegex = /^[^\s@]+@(kmutnb\.ac\.th|sci\.kmutnb\.ac\.th)$/;
        if (teacherEmailRegex.test(email) || email === "dabc75880@gmail.com") {
            role = 'teacher'; 
        }

        // ถ้าอีเมลเป็น ilovebabymonster744@gmail.com ให้ตั้งเป็น admin
        const adminEmail = "ilovebabymonster744@gmail.com";
        if (email === adminEmail) {
            role = 'admin'; 
        }

        const user = await Users.findOneAndUpdate(
            { email },
            { $set: { name, role } }, 
            { new: true }
        );

        if (user) {
            console.log('USER UPDATED', user);
            res.json(user);
        } else {
            const newUser = await new Users({
                email,
                name,
                role, 
            }).save();
            console.log('CREATED USER', newUser);
            res.json(newUser);
        }
    } catch (error) {
        console.error("Error creating or updating user:", error);
        res.status(500).json({ message: "Failed to create or update user" });
    }
};
//เอาง่ายๆคือเวลาแก้ไขข้อมูลตอนเขียนโค้ดหรือรีเฟรชหรือทำอะไรต่างๆไม่ต้องกด login ใหม่มันยังคงเป็น user คนนั้นตราบใดที่ยังไม่กด logout
exports.currentUser = async(req,res)=>{ //เป็นการเช็คว่าเวลามีหน้าอื่นหลายๆหน้าผู้ที่loginปัจจุบันก็จะยังคงอยู่ไม่หลุดออก
    try{
        const user = await Users.findOne({ //req.user มาจาก middleware ที่ผ่านdารตรวจ verifytoken
            email: req.user.email,         
        }).exec()
        res.send(user)
    }catch(err){
        console.log('Server Error!!');       
        res.status(400).send('Server Error!!')    
    }
}

exports.listUsers = async (req, res) => {
    try {
     //code
     const user = await Users.find({}).exec()
      res.send(user)
  
    } catch (err) {
      console.log(err);
      res.status(500).send("SERVER ERROR!");
    }
};

exports.removeUser = async (req, res) => {
    try {
     //code
     const id = req.params.id
     const user = await Users.findOneAndDelete(({_id:id}))
      res.send(user)
  
    } catch (err) {
      console.log(err);
      res.status(500).send("SERVER ERROR!");
    }
};