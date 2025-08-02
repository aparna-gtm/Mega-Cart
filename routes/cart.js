const express = require('express');
const router = express.Router(); // mini instance of app from app.js as we cannot export app 
const {isLoggedin}=require('../middleware')
const Product = require('../models/Product')
const User = require('../models/User')

// route to seee the cart
router.get('/user/cart', isLoggedin, async (req, res) => {
    let user = await User.findById(req.user._id).populate('cart');
    res.render('cart/cart', { user });
});







// add the product to cart actually
router.post('/user/:productId/add',isLoggedin,async(req,res)=>{
    let {productId}=req.params;
    let userId=req.user._id;
    let product= await Product.findById(productId);
    let user=await User.findById(userId);
    //user m puch krdo
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');

})










module.exports = router;