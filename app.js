// if(process.env.NODE_ENV!=='production'){
//   require('dotenv').config();
// }


require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));


const express=require('express');
let app=express();
const path=require('path');
const mongoose = require('mongoose');
const seedDB=require('./seed');
const ejsMate=require('ejs-mate');
const methodOverride = require('method-override');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const localStrategy=require('passport-local');
const User=require('./models/User');

const dbURL=process.env.dbURL || 'mongodb://localhost:27017/SHOOPING-APP'

mongoose.set('strictQuery',true);


mongoose.connect(dbURL)
.then(()=>{
    console.log("DB connected successfully");
})
.catch((err)=>{
    console.log("Error in connecting DB");
    console.log(err);
})

const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const productApi = require('./routes/api/productapi');

// seeding data ... bar bar na chale iske liye ek bar likhkr usko comment krdo
// seedDB();

let configSession={
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly:true,
    expires:Date.now()+ 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000
  }
 
}


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // _method is nam se access hoga ye
app.use(session(configSession));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;   
    res.locals.success = req.flash('success');      // Your custom flash key
    res.locals.error = req.flash('error');  // Optional error key
    next();
});

//Passport
passport.use(new localStrategy(User.authenticate()));

app.use(productRoutes); // har ek request pr chlega ab ye--> hr req pr path chk kia jayega
app.use(reviewRoutes);
app.use(userRoutes);
app.use(cartRoutes);
app.use(productApi);


app.get('/', (req, res) => {
  res.redirect('/products');
});













































app.listen(8080,()=>{
    console.log("server connceted at port 8080");
})
