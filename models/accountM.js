const db = require('../utils/db');
const tbName = 'users';
const mysql = require('mysql');

module.exports = {
    add: async user => {
        const id = db.add(tbName, user);
        return id;
    },
    getByUsername: async username => {
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        const params = [tbName, 'f_Username', username];
        sql = mysql.format(sql, params);
        const rs = await db.load(sql);
        if(rs.length > 0) {
            return rs[0];
        }
        return null;
    },
    userById: async(username)=>{
        const sql=`SELECT f_ID FROM ${tbName} WHERE f_Username='${username}'`;
        const rows=await db.load(sql);
        return rows;
    },
};