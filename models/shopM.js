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
    productShopByIdSP:async id=>{
        const sql=`SELECT * FROM ${tbProduct} WHERE id_sp='${id}'`;
        const rows=await db.load(sql);
        return rows;
    },
    del:async id=>{
        const sql=`DELETE FROM ${tbProduct} WHERE id_sp=${id}`;
        const rows=await db.load(sql);
        return rows;
    },
    add:async (ten,ha,gia,id_loai,count,uutien1,shop)=>{
        const sql=`INSERT INTO ${tbProduct} (name,image,price,id_loaisp,soluong,uutien,cuahang) VALUES ('${ten}','${ha}',${gia},${id_loai},${count},${uutien1},'${shop}') `;
        const rows=await db.load(sql);
        return rows;
    },
    update:async (id,price,count,uutien1)=>{
        const sql=`UPDATE ${tbProduct} SET price=${price}, soluong=${count}, uutien=${uutien1} WHERE id_sp=${id} `;
        const rows=await db.load(sql);
        return rows;
    },

};