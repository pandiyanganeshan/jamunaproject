import express from 'express';
import { User } from "../models/user.js";
import bcrypt, { hash } from "bcrypt";
import joi from "joi";
const router=express.Router();
router.post("/", async (req, res) => {
	try {
		var existingUser=await User.findOne({ email: req.body.email })
		// console.log(existingUser.password)
		if(existingUser)
		{
			
		  bcrypt.compare(req.body.password,existingUser.password,function(err,result){
			if(result){
				// res.send("success")
			
				const token = existingUser.generateAuthToken();
				res.status(200).send({ data: token, message: "logged in successfully" });
				
			}
			if(!result){
				return res.status(401).send({ message: "Invalid Email or Password" });
			  
			}
		})
		}
		
		if(!existingUser){
			return res.status(401).send({ message: "This user is not exits" });}
					  

	}
	catch (error) {
		res.send(error.message)
	 }

	}

);

const validate = (data) => {
	const schema = object({
		email: string().email().required().label("Email"),
		password: string().required().label("Password"),
	});
	return schema.validate(data);
};

export default router;
