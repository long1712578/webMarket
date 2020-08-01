let express=require('express');
let router=express.Router();
var order;

router.get('/',(req,res)=>{
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
       //console.log(product);
        var cartItem=req.session.cart.add(product,productId,quantity);
        order=cartItem;
       //console.log(cartItem.item.item[0].name);
       var str=JSON.stringify(cartItem);
       var json =  JSON.parse(str);
       //console.log(json.item);
        res.json(json);
    })
    .catch(error=>next(error));
});

router.put('/',(req,res)=>{
    var productId=req.body.id;
    var quantity=parseInt(req.body.quantity);
    var cartItem=req.session.cart.update(productId,quantity);
    res.json(cartItem);

});
router.delete('/',(req,res)=>{
    var productId=req.body.id;
    req.session.cart.remove(productId);
    res.json({
        totalQuantity: req.session.cart.totalQuantity,
        totalPrice: req.session.cart.totalPrice
    });
});

router.delete('/all',(req,res)=>{
    //console.log(order.totalQuantity);
    //const count=parseInt(order.totalQuantity);
     const mPro=require('../models/productM');
    // for(let i=0;i<count;i++){
    //     console.log(order.item);
    // }
    const ps=mPro.updateQuantity(1,1);
    req.session.cart.empty();
    res.sendStatus(204);
    res.end();
    
});

module.exports=router;