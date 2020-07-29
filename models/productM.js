const db=require('../utils/db');
const tbProduct='Product';
const pageSize=3;

module.exports={
    all: async()=>{
        const sql=`SELECT *FROM ${tbProduct}`;
        const rows=await db.load(sql);
        return rows;
    },
    allByCatId: async id =>{
        const sql=`SELECT *FROM ${tbProduct} WHERE id_loaisp=${id}`;
        const rows=await db.load(sql);
        return rows;
    },
    allSellPro: async u =>{
        const sql=`SELECT *FROM ${tbProduct} WHERE uutien=${u}`;
        const rows=await db.load(sql);
        return rows;
    },
    allSellProById: async id =>{
        const sql=`SELECT *FROM ${tbProduct} WHERE uutien=1 AND id_loaisp=${id}`;
        const rows=await db.load(sql);
        return rows;
    },
    allSellProByIdName: async (id,name) =>{
        const sql=`SELECT *FROM ${tbProduct} WHERE uutien=1 AND id_loaisp=${id} AND name LIKE '%${name}%' `;
        const rows=await db.load(sql);
        return rows;
    },
    allByProId: async i=>{
        const sql=`SELECT *FROM ${tbProduct} WHERE id_sp=${i}`;
        const rows=await db.load(sql);
        return rows;
    },
    allByIdPaging: async (id,page)=>{
        let sql= `SELECT count(*) AS total FROM ${tbProduct} WHERE id_loaisp=${id}`;
        const rs= await db.load(sql);
        const totalPage=rs[0].total;
        const pageTotal=Math.floor(totalPage / pageSize)+1;
        const offset= (page -1)* pageSize;
        sql= `SELECT * FROM ${tbProduct} WHERE id_loaisp= ${id} LIMIT ${pageSize} OFFSET ${offset}`;
        const rows= await db.load(sql);
        return {
            pageTotal: pageTotal,
            products: rows
        };
    },
    allSearchNameProALL: async(name)=>{
        let sql =`SELECT * FROM ${tbProduct} WHERE name LIKE '%${name}%'`;
        const rows=await db.load(sql);
        return rows;
    },
    allSearchNameByCatId: async(id,name)=>{
        let sql =`SELECT * FROM ${tbProduct} WHERE id_loaisp=${id} AND name LIKE '%${name}%'`;
        const rows=await db.load(sql);
        return rows;
    },
};