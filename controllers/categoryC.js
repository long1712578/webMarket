const express=require('express');
const router=express.Router();

const mCat=require('../models/categoryM');
const mPro=require('../models/productM');

router.get('/',async(req,res)=>{
    const cats=await mCat.all();
    const ps=await mPro.all();
    const psell=await mPro.allSellPro(1);
    for(let cat of cats){
        cat.isActive=false;
    }
    //cats[0].isActive=true;
    // for(let cat of cats){
    //     cat.isActive=false;
    //     if(cat.id_loaisp==id){
    //         cat.isActive=true;
    //     }
    // }
    res.render('index',{
       title: 'category',
       cats: cats, 
        ps: ps,
        psell: psell,
    });
});

router.get('/search',async(req,res)=>{
    const name=req.query.name;
    const cats=await mCat.all();
    const ps=await mPro.allSearchNameProALL(name);
    const id=ps[0].id_loaisp;
    const psell=await mPro.allSellProByIdName(id,name);
    for(let cat of cats){
        cat.isActive=false;
    }
    //cats[0].isActive=true;
    // for(let cat of cats){
    //     cat.isActive=false;
    //     if(cat.id_loaisp==id){
    //         cat.isActive=true;
    //     }
    // }
    res.render('index',{
       title: 'category',
       cats: cats, 
        ps: ps,
        psell: psell,
    });
});


router.get('/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const page=parseInt(req.query.page) || 1;
    const cats=await mCat.all();
    const ps=await mPro.allByCatId(id);
    const psell=await mPro.allSellProById(id);
    const rs=await mPro.allByIdPaging(id,page);
    for(let cat of cats){
        cat.isActive=false;
        if(cat.id_loaisp==id){
            cat.isActive=true;
        }
    }
    const pages=[];
    for (let i=0; i< rs.pageTotal;i++){
        pages[i]= {value: i+1, active: (i+1)===page};
    }
    const navs={};
    if(page>1){
        navs.prev= page-1;
    }
    if(page<rs.pageTotal){
        navs.next=page+1;
    }
    res.render('index',{
       title: 'category',
       cats: cats, 
       ps: rs.products,
       psell: psell,
       pages: pages,
        navs: navs,
    });
});

router.get('/:id/search',async(req,res)=>{
    const id=parseInt(req.params.id);
    const page=parseInt(req.query.page) || 1;
    const name=req.query.name;
    const cats=await mCat.all();
    const ps=await mPro.allSearchNameByCatId(id,name);
    const psell=await mPro.allSellProById(id);
    const rs=await mPro.allByIdPaging(id,page);
    for(let cat of cats){
        cat.isActive=false;
        if(cat.id_loaisp==id){
            cat.isActive=true;
        }
    }
    const pages=[];
    for (let i=0; i< rs.pageTotal;i++){
        pages[i]= {value: i+1, active: (i+1)===page};
    }
    const navs={};
    if(page>1){
        navs.prev= page-1;
    }
    if(page<rs.pageTotal){
        navs.next=page+1;
    }
    res.render('index',{
       title: 'category',
       cats: cats, 
       ps: ps,
       psell: psell,
       pages: pages,
        navs: navs,
    });
});


module.exports=router;