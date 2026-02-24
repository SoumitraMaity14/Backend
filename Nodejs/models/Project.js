const mongoose=require('mongoose')
const {Schema}=mongoose

const projectSchema=new Schema({
    name:{type:String, required: true},
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    column:{
        type: mongoose.Schema.Types.ObjectId
    }
},{timestamps:true})
module.exports=mongoose.model('Project', projectSchema)