// schema for for server side validation 

const Joi = require('joi');


const productSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    price:Joi.number().min(0).required(),
    des:Joi.string().required(),


})
const reviewSchema = Joi.object({
    rating: Joi.string().min(1).max(5).required(),
    comment: Joi.string().required(),


})

module.exports= {productSchema,reviewSchema};