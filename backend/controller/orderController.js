import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js"



//placing user order from frontend
const placeOrder  = async(req,res)=>{

    try {
     const newOrder = new orderModel({
         userId:req.body.userId,
         items:req.body.items,
         amount:req.body.amount,
         address:req.body.address
     })  
     await newOrder.save();
     await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}}) 

  
    return res.json({success:true})
} catch (error) {
    console.log(error);
    return res.json({success:false,message:"Error"})
    
}
}



//user orders for frontend

const userOrders = async(req,res)=>{
    try {
      const orders = await orderModel.find({userId:req.body.userId})
      return res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

const cancelOrder = async(req,res)=>{
    try {
      const orders = await orderModel.findByIdAndDelete({_id:req.body.id})
      return res.json({success:true,message:"Order cancelled"})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}



//Listing orders for admin panel
const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        return res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})        
    }
}

//api for updating order status
const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        return res.json({success:true,message:"status Updated"})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}


export {placeOrder, userOrders, listOrders, updateStatus, cancelOrder}