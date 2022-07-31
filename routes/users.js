import express from 'express';
import { User, validate } from "../models/user.js";
import bcrypt from "bcrypt";
const router=express.Router();

//register user
router.post("/", async (req, res) => {
	const saltRoute=10;
            bcrypt.hash(req.body.password,saltRoute,function(err,hash){
                var newData={            
                    name:req.body.name ,                   
                    email:req.body.email,
                    password:hash
                   
                    }
            
     async function createuser(){
                const email=req.body.email;
                // console.log(email);
                 try {
                    var existingUser=await User.findOne({email: newData.email })
                    // console.log(existingUser);                   
					if (existingUser)
							return res
								.status(409)
								.send({ message: "User with given email already Exist!" });

                     if(!existingUser){
                     var insert=await new User({ ...req.body, password: hash }).save();
					 res.status(201).send({ message: "Registered successfully" });
                    //  res.send(insert);
					 }
                   
                    }
                catch (error) {
                    res.send(error.message)
                 }
      }createuser();})
      
    
});

export default router;
