const express = require('express');
const router = express.Router();


const User = require('../../models/User');
const { isLoggedin } = require('../../middleware');

router.post('/product/:productId/like',isLoggedin,async(req,res)=>{
    let{productId}=req.params;
    let user=req.user;
    let isLiked=user.wishList.includes(productId);

    const option=isLiked? '$pull' : '$addToSet';
    req.user=await User.findByIdAndUpdate(req.user._id,{[option]:{wishList:productId}},{new:true})
    res.send('like api done');
})

router.get('/wishlist', isLoggedin, async (req, res) => {
  let user = await User.findById(req.user._id).populate('wishList');
  res.render('users/wishlist', { wishlist: user.wishList });
});

module.exports = router;
