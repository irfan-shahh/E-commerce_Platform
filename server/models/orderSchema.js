

const mongoose=require('mongoose')

const orderItemSchema=new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        requird:true,    
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    image: {
        type: String,
        required: true
    }
})

const orderSchema=new mongoose.Schema({
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
     },
     items:[orderItemSchema],
     totalAmount:{
        type:Number,
        required:true
     },
     status:{
        type:'String',
        enum:['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default:'pending'
     },
     paymentStatus:{
        type:String,
         enum: ['pending', 'paid', 'failed'],
         default:'pending'
     },
     stripeSessionId: {
        type: String
    },
    paidAt: {
        type: Date
    },
    shippedAt: {
        type: Date
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
});
module.exports=mongoose.model('Order',orderSchema)