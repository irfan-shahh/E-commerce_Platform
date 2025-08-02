require('dotenv').config()
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_KEY)
const url = 'http://localhost:3000'
const Order = require('../models/orderSchema')

const createCheckOutSession = async (req, res) => {
  const { products } = req.body
  try {
    const line_items = products.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.title.longTitle,
          images: [item.url]
        },
        unit_amount: Math.round(item.price.cost * 100)
      },
      quantity: item.quantity || 1
    }))
    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: 40 * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    const totalAmount=products.reduce((acc,item)=>acc+item.price.cost *(item.quantity ||1),0) + 40
    await Order.create({
      userId:req.user._id,
      items:products.map((item)=>({
        productId:item.id,
        title:item.title.longTitle,
        price:item.price.cost,
        quantity:item.quantity ||1,
        image:item.url
      })),
      totalAmount,
      stripeSessionId:session.id,
      status:'pending',
      paymentStatus:'pending'
    })

    res.status(200).json({ id: session.id })

  } catch (error) {
    console.error('Stripe session error:', error.message);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
}

const verifySession = async (req, res) => {
  try {
        const { sessionId } = req.body;
        const userId = req.user._id;

        const session = await stripe.checkout.sessions.retrieve(sessionId,{expand:['payment_intent']});

        if (session.payment_status === 'paid') {
            
            const order = await Order.findOne({ 
                stripeSessionId: sessionId,
                userId: userId 
            });

            if (order) {
               const updatedOrder = await Order.findByIdAndUpdate(
                    order._id,
                    {
                        status: 'confirmed',
                        paymentStatus: 'paid',
                        paidAt: new Date()
                    },
                    { new: true } 
                );

                res.status(200).json({ 
                    success: true, 
                    orderDetails: {
                        orderId:updatedOrder._id,
                        totalAmount: updatedOrder.totalAmount,
                        items: updatedOrder.items,
                         status: updatedOrder.status,
                        paymentStatus: updatedOrder.paymentStatus,
                        paidAt: updatedOrder.paidAt
                    }
                });
            } else {
                res.status(404).json({ success: false, message: 'Order not found' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Payment not completed' });
        }
    } catch (error) {
        console.error('Session verification error:', error);
        res.status(500).json({ success: false, message: 'Verification failed' });
    }
};

const getUserOrders=async (req,res)=>{
      try{
          const userId=req.user._id
          const orders=await Order.find({
            userId,
            paymentStatus:'paid',
            // status:{$in:['confirmed','shipped','delivered']}
          }).sort({createdAt:-1})
          return res.status(200).json({orders})
      }catch(error){
       console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
      }
}



  module.exports = { createCheckOutSession, verifySession, getUserOrders }



  