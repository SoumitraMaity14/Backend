const User = require("../models/User");

const createUser=async(req, res)=>{
    const {name, email, password, role}=req.body
    const existingUser=req.user.role;
    if(role==="super-admin"){
        return res.status(403).json({message:"super admin only creeate user via seeds only"})
    }
    if(role==="admin"  && existingUser.role==="admin"){
        return res.status(403).json({message:"admin canont create another admin account"})
    }
    try{
         const user=await User.findOne({email})
         if(user){
            return res.status(404).json({message:"user is already exist"})
         }
        const newUser=new User({
            name, email, password, role
    })
        await newUser.save()
        res.status(201).json({message: "user created successful"})
    }
    catch(error){
        console.log("something Went wrong", error)
        res.status(500).json({message: "Internal server error"})
    }
}

const loginUser=async(req, res)=>{
    try{
        const {email, password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isMatchPassword=await bcrypt.compare(password, user.password)
        if(!isMatchPassword){
            return res.status(401).json({message: "Password is not matched"})
        }
        const token=await res.cookie('authToken', token, cookieOptions)
        return res.status(200).json({message:"login successfully"})
    }
    catch(error){
        return res.status(500).json({message:"Inernal server error"})
    }
}                                                                                                       