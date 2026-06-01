
const { default: mongoose } = require('mongoose')

const searchSchema=new mongoose.Schema({
    name:String,
    category:String,
    brand:String,
    price:Number
})
module.exports=mongoose.model('SearchProduct', searchSchema)