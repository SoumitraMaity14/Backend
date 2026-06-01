const express=require('express')
const router=express.Router()

const {getSearch}=require('../controller/searchController')

router.get('/', getSearch)

module.exports=router