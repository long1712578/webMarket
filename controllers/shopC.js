let express=require('express');
let router=express.Router();
let mPro=require('../models/shopM');

router.get('/',async(req,res)=>{
    //var id=req.session.user;
    var name=req.session.TenCuaHang;
    var ma=req.session.MaCuaHang;
    //const ps= req.session.ps;
    console.log(ma);
    const ps=await mPro.productShopById(ma);
    console.log(ps);
    res.render('myShop',{
        name: name,
        ps: ps,
    });
});

router.get('/add',(req,res)=>{
    const ma=req.session.MaCuaHang;
    res.render('myShopProAdd',{
        title: 'Shop Add Product',
        ma: ma,
    });
});
router.post('/save',(req,res)=>{
    //let id=9;
    let name=req.body.name;
    let image=req.body.image;
    let price=req.body.price;
    let cat=req.body.cat;
    let count=req.body.count;
    let uutien=req.body.uutien;
    let shop=req.body.shop;
    //let data={id,name,image,price,cat,count,uutien,shop};
    const ps= mPro.add(name,image,price,cat,count,uutien,shop);
    //req.session.ps=ps;
    res.redirect('/myShop');
})

router.get('/delete/:id',async(req,res)=>{
    //console.log("123");
    const id=parseInt(req.params.id);
    const rows=mPro.del(id);
    const cuuHang=req.session.MaCuaHang;
    var name=req.session.TenCuaHang;
    const ps=await mPro.productShopById(cuuHang);
    res.redirect('/myShop');

});

router.get('/edit/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    //const rows=mPro.del(id);
    //const cuuHang=req.session.MaCuaHang;
    const ps=await mPro.productShopByIdSP(id);
    res.render('myShopProEdit',{
        title: 'Edit Product',
        ps: ps,
    });

});

router.post('/update',(req,res)=>{
    let id=req.body.id;
    let price=req.body.price;
    let count=req.body.count;
    let uutien=req.body.uutien;
    //let data={id,name,image,price,cat,count,uutien,shop};
    const ps= mPro.update(id,price,count,uutien);
    //req.session.ps=ps;
    res.redirect('/myShop');
})

module.exports = router;

