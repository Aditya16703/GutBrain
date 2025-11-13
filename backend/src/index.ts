import express from 'express';
import cors from 'cors';
import zod from 'zod';
import jwt from 'jsonwebtoken';
import {User} from './db.js';
import { JWT_SECRET } from './config.js';
import  bcrypt from 'bcryptjs';
import { LinkModel , ContentModel } from './db.js';
import  { userMiddleware }from './middleware.js';
import { random }  from './util.js'

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




 app.post("/api/v1/signup" , userMiddleware , async(req, res) =>{
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

        const newUser = await User.create({
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
 


 app.post("/api/v1/signin" , userMiddleware , async(req , res) =>{

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


 app.post("/api/v1/content" , userMiddleware , async(req , res ) =>{

    try {

        const link  = req.body.link ;
        const type  = req.body.type ;
        
        await ContentModel.create({
            userId : req.body.userId  ,
            title : req.body.title,
            link ,
            tages : [] ,
            type  ,
        })
        

        res.json({
            message : "Content created successfully"
        })

    } catch (error){

        console.log(error);
        return res.status(500).json({
            message : "Internal server error"
        })
    }
})

 app.get("/api/v1/content" , userMiddleware , async(req, res) => {
    try {
          const userId = req.query.userId ;
          const content = await ContentModel.find({ userId : userId }).populate("userId" , "username");
          return res.json({
            content  : content
          })
    }catch (error){
        console.log(error);
        return res.status(500).json({
            message : "Internal server error"
        })
    }
 })

 app.delete("/api/v1/content" , userMiddleware ,(req , res) =>{

    const  contentId = req.query.contentId ;
    ContentModel.findByIdAndDelete(contentId).then(() => {
        return res.json({
            message : "Content deleted successfully"
        })
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({
            message : "Internal server error"
        })
    })
    
 })


 app.post("/api/v1/brain/share" , userMiddleware , async (req , res) =>
 {
    try {

        const share = req.body.share;
        console.log("Share received: ", share);

        if (share) {
             const existingLink = await LinkModel.findOne ({
                userId : req.body.userId ,
             });

             if(existingLink){
                res.json({
                    hash : existingLink.hash
            })

            return ;
             }

             const hash = random(10) ;
             await LinkModel.create({
                userId : req.body.userId ,
                hash : hash 
             })


             res.json({
                hash : hash
            })
        } else { 
            await LinkModel.deleteOne({
                userId : req.body.userId
            });

            res.json({
                message : "Link deleted successfully"   
            })
        }
        

    }catch (error){
        console.log(error);
        return res.status(500).json({
            message : "Internal server error"
        })
    }

 })


 app.get("/api/v1/brain/:shareLink" , async (req , res) => {
    try {

        const  hash = req.params.shareLink;

        const link = await LinkModel.findOne({
            hash : hash 
        });

        if (!link){
            return res.status(411).json({
                message : "Link not found"
            })
            return ; 
        }

        //user Id 

        const content = await ContentModel.find({
            userId : link.userId
        })

        console.log(link); 
        const user = await User.findOne({
            _id : link.userId
        })

        if(!user) {
            res.status(411).json({
                message : "user not found , error should ideally not happen"
            })

            return ;
        }


        res.json({
            username : user.username,
            content : content
        })

    }catch (error){
        console.log(error);
        return res.status(500).json({
            message : "Internal server error"
        })
    }
 })

const port = 3000;
app.listen(port);

