const taskFile=async(req, res)=>{
    try{
        const {taskId}=req.params
        const task=await Task.findById({taskId})

        const newTask=req.files.map(file=>(
{
            _id:
        }
        ))

    }
    


    
}