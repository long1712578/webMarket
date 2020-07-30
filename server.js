let express=require('express');
let app=express();

app.use(express.static(__dirname+ '/public'));

//Chuyen tu file tinh thanh cac temple handlebar
let expressHbs=require('express-handlebars');
let express_session=require('express-session');
let express_handlebars_sections=require('express-handlebars-sections');
let body_parser=require('body-parser');
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

app.use(express_session({
    secret: "qweasdzxc",
    resave: false,
    saveUninitialized: true
}));
app.set('view engine','hbs');
app.use(body_parser.urlencoded({
    extended: true
}));

app.use(body_parser.json());

app.use('/', require('./controllers/indexC'));
app.use('/products',require('./controllers/categoryC'));
app.use('/products/ps',require('./controllers/productC'));
//app.use("/signUp", signup);
app.use("/", require('./controllers/signInC'));
app.use("/", require('./controllers/signUpC'));

app.set('port',3000);
app.listen(app.get('port'),()=>{
    console.log("server port 3000");
})
