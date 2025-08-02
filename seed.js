const  mongoose=require('mongoose');

const Product = require('./models/Product')

const products=[
    {
        // keys wahi honi chhiaye jo schema me hain
        name:"Iphone 14",
        img:'https://images.unsplash.com/photo-1565714138558-4d2eaa7cea34?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price:130000,
        des:"Latest model of Iphone"
    },
    {
        name:"MacBook M2",
        img:'https://images.unsplash.com/photo-1675868374786-3edd36dddf04?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price:150000,
        des:"Latest model of Mac"
    },
    {
        name:"Fortuner",
        img:'https://images.unsplash.com/photo-1664783856972-ac9922d7b2d3?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price:5000000,
        des:"Fortuner it is!"
    },
    {
        name:"Kitchen Set",
        img:'https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price:130000,
        des:"Modular kitchen items"
    }
    
]

async function seedDB(){ 
     await Product.insertMany(products);       // promise return hoga-> promise ki chaining se bchne--> async await
    console.log("Data seeded successfully");
}

module.exports= seedDB;