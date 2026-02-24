const User = require("../models/User");

const createProject=async(req, res)=>{
    const {name, member}=req.body
    const ownerId=req.user._id
    try{
        const newProject=new Schema({
            name: name,
            owner: ownerId,
            member:[ownerId,...User(member|[])]
        })
        await newProject.save()

        await User.updateMany(
            {_id:{memberOfBoards:newUser._id}},
            {$addToSet:{memberOfBoards:newUser._id}}
        )
        await Project.findById({newProject._id})
        .populate('owner', 'name email')
        .populate('member', 'name email role')
        return res.status(201).json({message: "Project created"})
    }
    catch(error){
        return res.status(500).json({message: "Internal Server error"})
    }
}


const deleteBoard=async(req, res)=>{
    const {boardId}=req.params;
    try{
        const board=await Board.findById(boardId);
        if(!board){
            return res.status(404).json({message: "Board not found"})
        }
        await Task.deleteMany({board:boardId})

        await Column.deleteMany({board:boardId})

        await User.updateMany(
            {memberOfBoards:boardId},
            {$pull:{memberOfBoards:boardId}}
        )
        await board.deleteOne()
        return res.status(200).json({message: "Board deleted Successfully"})
    }
    catch(error){
        return res.status(500).json({message:"Board deleting Server error"})
    }
}