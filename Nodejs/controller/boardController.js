const User = require("../models/User");


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