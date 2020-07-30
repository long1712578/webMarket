let express=require('express');
let router=express.Router();

router.get('/',(req,res,next)=>{
    var cart=req.session.cart;
    res.locals.cart=cart.getCart();
    res.render('carts');
})
router.post('/',(req,res,next)=>{
    var productId=req.body.id;
    var quantity=isNaN(req.body.quantity)? 1 : req.body.quantity;
    var mPro=require('../models/productM');
    mPro
    .allByProId(productId)
    .then(product=>{
        var cartItem=req.session.cart.add(product,productId,quantity);
        res.json(cartItem);
    })
    .catch(error=>next(error));
})
module.exports=router;