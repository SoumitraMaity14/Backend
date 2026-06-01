const Search=require('../models/Search')

exports.getSearch=async(req, res)=>{
    try{
        const search=req.query.search || ""
        const products= await Search.find({
            name:{
                $regex: search,
                $options: "i"
            }
        })
        res.status(200).json({
            success:true,
            count:products.length,
            products
        })
    }
    catch(error){
        res.status(500).json({
            success: flase,
            message: error.message
        })
    }
}