const createUser=async(req, res)=>{
    const {name, email, password, role}=req.body
    try{
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