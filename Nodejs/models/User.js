const mongoose=require('mongoose')
const{Schema}=mongoose

const userSchema=new Schema({
    name: {type:String, required: true},
    email: {type: String, required: true},
    role:{type: String, enum:["super-admin", "admin" , "employee"]},
    password:{type: String, required: true, },
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    boardOfMember:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board"
    }
}, 
//timestamps use for createdAt and updatedAt
{timestamps: true})  
module.exports=mongoose.Model('User', userSchema)