const product=require('../models/productSchema')

const getProducts=async(req,res)=>{
    try{
      const products= await product.find({})
       return res.status(200).json(products)
    }
    catch(error){
        return res.status(500).json({msg:'error while getting the products',error})
    }
}
const getProductsById= async (req,res)=>{
    try{
        const products=await product.findOne({id:req.params.id})
       return  res.status(200).json(products)
    }catch(error){
       return res.status(500).json({msg:'error while getting product by id',error})
    }
}
module.exports={getProducts,getProductsById};
