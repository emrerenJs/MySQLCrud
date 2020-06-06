const mysql = require('mysql')
class Database{
    constructor(){
        this.connection = mysql.createPool({
            connectionLimit : 10,
            host : 'localhost',
            user : 'root',
            password : 'emcobase35',
            database : 'crudexpress'
        })
    }
    getConnection(){
        return new Promise((resolve,reject)=>{
            resolve(this.connection)
        })
    }
}
module.exports = Database