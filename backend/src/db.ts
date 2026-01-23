  
import  mongoose from "mongoose" ;

import { mongoURL } from "./config.js";
import {Schema , Document}  from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to mongo', err);
        // Exit process with failure
        process.exit(1);
    }
};


const userSchema =  new mongoose.Schema({
    username : {
        type : String , 
        required : true
    },

    password : {
        type : String , 
        required : true 
    },

    firstName : {
        type : String , 
        required : true 
    },
 
    lastName : {
        type : String ,
        required : true
    }
});

export const User = mongoose.model("User" , userSchema);



export interface IContent extends Document {
     userId : mongoose.Types.ObjectId ;
     title : string ;
     link : string;
     tags :  mongoose.Types.ObjectId[] ;
     type : "document" | "image" | "video" | "audio" ;
     createdAt : Date;
}

const contentSchema = new Schema<IContent>({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },


    title : {
        type : String , 
 
    },

    link : {
        type : String ,
    },


    tags : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Tags",
    }],
    type : {
        type : String, 
        enum : ["document", "image", "video" , "audio"]
    },

    createdAt : {
        type : Date , 
        default : Date.now
    }

    
    
})




 const LinkSchema = new Schema ({
      hash : String , 
      userId : { type : mongoose.Schema.Types.ObjectId , ref : "User"  , required : true, unique : true },
 })


export const LinkModel = mongoose.model("Links", LinkSchema);
export const ContentModel = mongoose.model("Content", contentSchema);
