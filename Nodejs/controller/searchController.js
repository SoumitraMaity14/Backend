const Search = require('../models/Search')

exports.getSearch = async (req, res) => {
    try {
        const {search="", category, brand} = req.query
        let query={}

         if(category){
            query.category=category
        }
        if(brand){
            query.brand=brand
        }
        const products = await Search.find(query)
        
        const searchResult = search.toLowerCase()
       

        if (!search) {
            return res.status(200).json({
                success: true,
                count: products.length,
                products
            })
        }

        const rankedSearch=products.map(product=>{
            let score=0
            const name=(product.name||"").toLowerCase()

            if(name===searchResult){
                score+=100
            }
            else if(name.startsWith(searchResult)){
                score += 80
            }
            else if(name.includes(searchResult)){
                score+=60
            }
            else{
                const matchCount=searchResult
                .split("")
                .filter(char=>name.includes(char)).length

               score=matchCount>3? 30 :0
            }
            return {
                ...product.toObject(),
                score
            }
        })
        .filter(product=>product.score>0)
        .sort((a,b)=>b.score-a.score)

        return res.status(200).json({
            success: true,
            count: rankedSearch.length,
            products: rankedSearch
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.createProduct=async (req, res)=>{
    
    try{
        const {name, category, brand, price}=req.body;
        const existingSearch=await Search.findOne({name})
        if(existingSearch){
            return res.status(400).json({
                message: "user already exist"
            })
        }
        const products= await Search.create({
            name:name, category:category, brand:brand, price:price
        })

        return res.status(201).json({
            success:true,
            products,
            message: "product created successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}