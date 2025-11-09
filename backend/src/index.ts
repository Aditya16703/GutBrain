import express from 'express';
import cors from 'cors';
import zod from 'zod';
import jwt from 'jsonwebtoken';
import {User} from './db.js';
import { JWT_SECRET } from './config.js';
import  bcrypt from 'bcryptjs';
const app = express();
app.use(cors());

app.use(express.json());

const signupSchema = zod.object({
    username: zod.string().min(3),
    password: zod.string().min(6),
    email: zod.string().email(),
    firstName : zod.string().min(1),
    lastName : zod.string().min(1)

})




 app.post("/api/v1/signup" , async(req, res) =>{
    try {

        const body = req.body;
        const {success} = signupSchema.safeParse(body);

        if(!success){
            res.status(400).json({
                message : "Invalid data "
            })
        }

        const existingUser = await User.findOne({username : body.username});

        if(existingUser){
            res.status(400).json({
                message : "Username already exists"
            })
        }

        const newUser = new User({
            username : body.username,
            password : body.password,
            email : body.email,
            firstName : body.firstName,
            lastName : body.lastName
        })

        const token = jwt.sign(
             {
                userid : newUser._id,
             },
                JWT_SECRET
        )

        await newUser.save();
    }

    catch (error){

         res.status(500).json({
            message : "Internal server error"
         })
    }


   

 })



 const signinSchema = zod.object({
    username: zod.string().min(3),
    password: zod.string().min(6),
   

})
 


 app.post("/api/v1/signin" , async(req , res) =>{

    try {
         const body = req.body;
        const {success} = signinSchema.safeParse(body);

        if(!success){
            res.status(400).json({
                message :  "Invalid input"
            });
        
        }

        const existingUser = await User.findOne({
            username : req.body.username,
            password : req.body.password
    })

        if(!existingUser){
            return res.status(401).json({
                message : "User not exist please enter correct username and password"
            })
        }

        const isPasswordValid = await bcrypt.compare(body.password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }


        const token = jwt.sign(
            {
                 userid : existingUser._id,
            },
            JWT_SECRET
        )

        return res.json({
      token: token,
    });




    }catch(error){

         console.log(error);
    return res.status(500).json({
        message: "Internal server error"
    })
    }
    
 })


 app.post("/api/v1/content" , (req , res ) =>{

    try {

        

    } catch (error){

        console.log(error);
        return res.status(500).json({
            message : "Internal server error"
        })

    }


    })

 app.get("/api/v1/content" , (res , rep) =>{
    
 })

 app.delete("/api/v1/content" , (res , rep) =>{
    
 })

const port = 3000;

