const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
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
userSchema.pre("save", async function(next){
    if(!this.password) return next()
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.generateJWT=function(){
    const token=jwt.sign({id:this._id, role: this.role}, process.env.JWT_SECRET, {expiresIn: '3d'})
    return token
}
module.exports=mongoose.Model('User', userSchema)