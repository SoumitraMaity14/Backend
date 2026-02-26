const Project = require("../models/Project");
const User = require("../models/User");

const createProject=async(req, res)=>{
    const {name, member}=req.body
    const ownerId=req.user._id
    try{
        const newProject=new Project({
            name: name,
            owner: ownerId,
            member:[ownerId,...(member || [])]
        })
        await newProject.save()

        await User.updateMany(
            {_id:{$in:newProject.member}},
            {$addToSet:{memberOfBoards:newProject._id}}
        )
        const project=await Project.findById(newProject._id)
        .populate('owner', 'name email')
        .populate('member', 'name email role')
        return res.status(201).json({message: "Project created", project })
    }
    catch(error){
        return res.status(500).json({message: "Internal Server error"})
    }
}

const getProjectUser=async(req, res)=>{
    try{
        const project=await Project.find(
            {owner: req.user._id}
        )
        .select('_id name owner members')
        .populate('owner', 'name email')
        .populate('members', 'name email role')
        return res.status(200).json(project)
    }
    catch(error){
        return res.status(500).json({message:"Internal server errror"})
    }
}

const getProjectById=async(req, res)=>{
    const {projectId}=req.params
    try{
        const project=await Project.findById(projectId)
        .populate({
            te
        })

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