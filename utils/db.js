const mysql=require('mysql');

function createConnection(){
    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        pass: '',
        database: 'marketonline'
    });
}

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
