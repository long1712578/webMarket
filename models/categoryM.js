const db=require('../utils/db');
const tbCategory='Category';

module.exports={
    all: async()=>{
        const sql=`SELECT *FROM ${tbCategory}`;
        const rows=await db.load(sql);
        return rows;
    },
};