const express = require('express');
const router = express.Router(); // mini instance of app from app.js as we cannot export app 
const Product = require('../models/Product')
const {validateProduct,isLoggedin,isSeller,isProductAuthor}=require('../middleware')








router.get('/products',async (req, res) => {  // get req /products pr jayegi
    try {
        let products = await Product.find({});
        res.render('products/index', { products });
    }
    catch (err) {
        res.status(500).render('error', { err: err.message });
    }
})



// to show form for adding new product
router.get('/product/new', isLoggedin,(req, res) => {
    try {
        res.render('products/new');
    }
    catch (err) {
        res.status(500).render('error', { err: er.message });
    }
})

// actually add the product
router.post('/products',validateProduct,isLoggedin,isSeller, async (req, res) => {

    try {
        let { name, img, price, des } = req.body;
        await Product.create({ name, img, price, des ,author:req.user._id});
        req.flash('success','Product added successfully');
        res.redirect('/products') //redirect mtlb get req
    }
    catch (err) {
        res.status(500).render('error', { err: err.message });
    }
})

// show a particular product
router.get('/products/:id', isLoggedin,async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show', { foundProduct, msg:req.flash('msg') });
    }
    catch (err) {
        res.status(500).render('error', { err: err.message });
    }
})


// form to edit a product
router.get('/products/:id/edit',isLoggedin, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', { foundProduct });
    }
    catch (err) {
        res.status(500).render('error', { err: err.message });
    }
})

// to acturally edit the data in db
router.patch('/products/:id',validateProduct,isLoggedin,isSeller, async (req, res) => {
    try {
        let { id } = req.params;
        // req.body me humko faorm ka naya bhara hua maal milega
        let { name, img, price, des } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, des });
        req.flash('success','Product edited successfully');
        res.redirect(`/products/${id}`)
    }
    catch (err) {
        res.status(500).render('error', { err: err.message });
    }
})


// to delete a product and redirect
router.delete('/products/:id', isLoggedin,isProductAuthor,async (req, res) => {
    try {
        let { id } = req.params;
        await Product.findByIdAndDelete(id);
        req.flash('success','Product deleted successfully');
        res.redirect('/products');
    }
    catch (err) {
        res.status(500).render('error', { err: err.message });
    }
})



module.exports = router;