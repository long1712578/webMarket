const db=require('../utils/db');
const tbProduct='Product';
const tbName='store';
//const tbName1='users';

module.exports={
    nameShopById:async id=>{
        const sql=`SELECT * FROM ${tbName} WHERE NguoiDung=${id}`;
        const rows=await db.load(sql);
        return rows;
    },
    productShopById:async id=>{
        const sql=`SELECT * FROM ${tbProduct} WHERE cuahang='${id}'`;
        const rows=await db.load(sql);
        return rows;
    },
};