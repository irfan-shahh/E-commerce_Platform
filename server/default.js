const {products}=require('./constants/data')
const product=require('./models/productSchema')

const Defaultdata=async ()=>{
    try{
        await product.insertMany(products)
        console.log(' default data added successfully')
    }catch(error){
        console.log('error while inserting the default data',error.message)
    }
}
module.exports=Defaultdata;