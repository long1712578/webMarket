const express=require('express');
const router=express.Router();

const mPro=require('../models/productM');

router.get('/:i',async(req,res)=>{
    const i=parseInt(req.params.i);
    const proDetail=await mPro.allByProId(i);
    res.render('detailProduct',{
       title: 'product',
       proDetail: proDetail,
    });
});
module.exports=router;