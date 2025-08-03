const {productSchema,reviewSchema} =require('./schema')
const Product = require('./models/Product');

const validateProduct=(req,res,next)=>{
    const {name,img,price,des}=req.body;
    const {error}=productSchema.validate({name,img,price,des});
    if(error){
        return res.render('error');
    }
    next();
}

const validateReview=(req,res,next)=>{
    const {rating,comment}=req.body;
    const {error}=reviewSchema.validate({rating,comment});
    if(error){
        return res.render('error');
    }
    next();
}

const isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if (req.xhr) {
      // If it's an AJAX request
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.flash('error', "Please Login first");
    return res.redirect('/login');
  }
  next();
};


const isSeller=(req,res,next)=>{
    
    if(!req.user.role){
        req.flash('error',"You do not have the permission to do that");
        
        return res.redirect('/products');
        
    }
    if(req.user.role!=="seller"){
        req.flash('error',"You do not have the permission to do that")
        return res.redirect('/products');
        
    }
    next();
}
const isProductAuthor = async (req, res, next) => {
    let { id } = req.params;
    let product = await Product.findById(id);

    if (!product || !product.author) {
        req.flash('error', "You are not authorised to do that");
        console.log("Checking author:", product?.author, "Logged-in user:", req.user._id);
        return res.redirect('/products');
    }

    if (!product.author.equals(req.user._id)) {
        req.flash('error', "You are not authorised to do that");
        return res.redirect('/products');
    }

    next();
}








module.exports={isLoggedin,validateReview,validateProduct,isSeller,isProductAuthor};