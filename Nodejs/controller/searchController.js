const Search = require('../models/Search')

exports.getSearch = async (req, res) => {
    try {
        const search = req.query.search || ""
        const products = await Search.find()

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