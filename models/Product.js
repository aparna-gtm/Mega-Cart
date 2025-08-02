const mongoose=require('mongoose');


const productSchema=new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:true
    },
    img: {
        type:String,
        trim:true,
        // default
    },
    price:{

        type:Number,
        //min:0,
        required:true
    },
    des:{
        type:String,
        trim:true,
    },
    avgRating:{
        type:Number,
        default:0
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }
})
let Product=mongoose.model('Product',productSchema);

module.exports =Product;

//  middleware jo bts mongodb operations karwane pr use hota hai and iske andar pre and post middleware hote hain which are
// basically used over the scema and befoe the model is js class 

productSchema.post('findOneAndDelete',async (product)=>{
    if(product.reviews.length>0){
        await Review.deleteMany({_id:Product.reviews});
    }
})