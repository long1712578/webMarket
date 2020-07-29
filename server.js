let express=require('express');
let app=express();

app.use(express.static(__dirname+ '/public'));

//Chuyen tu file tinh thanh cac temple handlebar
let expressHbs=require('express-handlebars');
//Cau hinh hbs
let hbs=expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname+'/views/layouts', //thu muc chinh
    partialsDir: __dirname+"/views/partials",//Chua cac thu muc con thanh phan

});
app.engine('hbs',hbs.engine);
app.set('view engine','hbs');

//default root server layout
//  app.get('/',(req,res)=>{
//      res.render('index');
//  });
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
