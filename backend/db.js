const mysql = require('mysql');

require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database : process.env.DATABASE
});

function query (sql, ForPrpStmts){
    return new Promise( ( resolve, reject ) => {
        con.query( sql, ForPrpStmts, ( err, rows ) => {
            if ( err )
            {
                reject( err );
            }
            else
            {
                resolve( rows );
            }
        });
    });
}

module.exports = {
    query,
};