  
import  mongoose from "mongoose" ;

import {Schema , Document}  from "mongoose";

mongoose.connect('mongodb+srv://ac3413452_db_user:Shivendra123@cluster0.4h7ayno.mongodb.net/').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.error('Error connecting to mongo' , err));


const userSchema =  new mongoose.Schema({
    usename : {
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


export interface IContent extends Document {
    userId : mongoose.Types.ObjectId;
     type : "document" | "image" | "video" | "audio";
     link : string;
     title : string ;
     createdAt : Date;
}

const contentSchem = new Schema<IContent>({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    type : {
        type : String, 
        enum : ["document", "image", "video" , "audio"]
    }
    
})




 export const User = mongoose.model("User" , userSchema);



