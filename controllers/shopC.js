let express=require('express');
let router=express.Router();
let mPro=require('../models/shopM');


router.get('/',(req,res)=>{
    var id=req.session.user;
    var name=req.session.TenCuaHang;
    var ma=req.session.MaCuaHang;
    const ps= req.session.ps;

    //console.log(ps);
    res.render('myShop',{
        name: name,
        ps: ps,
    });
})
module.exports=router;