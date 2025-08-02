const mongoose=require('mongoose')

const productSchema = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
    },
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});

module.exports=mongoose.model('product',productSchema)


