const mysql=require('mysql');
const { param } = require('../controllers/shopC');
//const { delete } = require('request');

function createConnection(){
    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        pass: '',
        database: 'marketonline'
    });
};

exports.load=sql=>{
    return new Promise((resole,reject)=>{
        const con=createConnection();
        con.connect(err=>{
            if(err){
                reject(err);
            }
        });
        con.query(sql,(error,results,fields)=>{
            if(error){
                reject(error);
            }
            resole(results);
        });
        con.end();
    });
};

exports.add = (tbName, entity) => {
    return new Promise((resolve, reject) => {
        const con = createConnection();
        con.connect(err => {
            if(err) {
                reject(err);
            }
        });
        const sql = `INSERT INTO \`${tbName}\` SET ?`;
        con.query(sql, entity, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.insertId);
        });
        con.end();
    });
};

exports.del = (tbName, idField,id) => {
    return new Promise((resolve, reject) => {
        const con = createConnection();
        con.connect(err => {
            if(err) {
                reject(err);
            }
        });
        const sql = `DELETE FROM ?? WHERE ??=?`;
        const params=[tbName,idField,id];
        sql=mysql.format(sql,params);
        con.query(sql, (error, results,fields) => {
            if (error) {
                reject(error);
            }else{
                resolve(results.affectedRows);
            }
            
        });
        con.end();
    });
};

exports.update = (tbName, idField,entity) => {
    return new Promise((resolve, reject) => {
        const con = createConnection();
        con.connect(err => {
            if(err) {
                reject(err);
            }
        });
        const id=entity[idField];
        delete entity[idField];
        let sql = `UPDATE ${tbName} SET ? WHERE ${idField}=${id}`;
        con.query(sql,entity, (error, results,fields) => {
            if (error) {
                reject(error);
            }else{
                resolve(results.changedRows);
            }
            
        });
        con.end();
    });
};
