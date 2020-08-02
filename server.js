let express=require('express');
let app=express();

app.use(express.static(__dirname+ '/public'));

//Chuyen tu file tinh thanh cac temple handlebar
let expressHbs=require('express-handlebars');
let session=require('express-session');
let express_handlebars_sections=require('express-handlebars-sections');
let body_parser=require('body-parser');
let cookie_parser=require('cookie-parser');
//Cau hinh hbs
let hbs=expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname+'/views/layouts', //thu muc chinh
    partialsDir: __dirname+"/views/partials",//Chua cac thu muc con thanh phan

});
app.engine('hbs',hbs.engine);
app.engine('.hbs', expressHbs({
    helpers: {
        section: express_handlebars_sections()
    },
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname+'/views/layouts', //thu muc chinh
    partialsDir: __dirname+"/views/partials",//Chua cac thu muc con thanh phan
}));

app.set('view engine','hbs');
//body-parser
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: false,
}));

//Use cookie-parser
app.use(cookie_parser());
//Use session cookie
app.use(session({
    cookie: {httpOnly: true, maxAge: 30*24*60*60*1000},
    secret: 'S3crect',
    resave: false,
    saveUninitialized: false
}));
//Use cart controller
//Init cart
let Cart=require('./models/cartM');
app.use((req,res,next)=>{
    var cart=new Cart(req.session.cart ? req.session.cart:{});
    req.session.cart=cart;
    res.locals.totalQuantity=cart.totalQuantity;
    next();
});

app.use('/', require('./controllers/indexC'));
app.use('/products',require('./controllers/categoryC'));
app.use('/products/ps',require('./controllers/productC'));
app.use("/", require('./controllers/signInC'));
app.use("/", require('./controllers/signUpC'));
app.use("/cart",require('./controllers/cartC'));
app.use("/myShop",require('./controllers/shopC'));


app.set('port',3000);
app.listen(app.get('port'),()=>{
    console.log("server port 3000");
});
