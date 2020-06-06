const Express = require('express')
const Router = Express.Router()
const Database = require('../Database/Database')
const dataBase = new Database()
Router.get(['/get','/'], async(request,response)=>{
    try{
        const result = await dataBase.getConnection()
        let sql = 'Select * from Customers'
        await result.query(sql,(error,result,fields)=>{
            console.log(result)
            if(error)
                throw error
            response.json({
                "title":"Customers",
                "body":result
            })
        })
    }catch(error){
        await response.json({
            "title": "error",
            "body":error.toString()
        })
    }
})
Router.get('/get/:id', async (request, response)=>{
    try{
        const connection = await dataBase.getConnection()
        const id = request.params.id
        const sql = 'select * from Customers where ID = ?'
        await connection.query(sql,[id],(error,result,fields)=>{
            if(error)
                throw error
            response.json({
                "title":"Get Customer",
                "body":result
            })
        })
    }catch(error){
        await response.json({
            "title":"error",
            "body":error
        })
    }
})
Router.get('/add',(request,response)=>{
    response.json({
        "title":"Add",
        "body":"Adding New personal page"
    })
})
Router.post('/add',async (request,response)=>{
    const {FirstName, LastName, Email} = request.body
    try{
        const connection = await dataBase.getConnection()
        const sql = `insert into Customers(FirstName,LastName,Email)
                     values('${FirstName}','${LastName}','${Email}')`
        await connection.query(sql,(error,result)=>{
            if(error)
                throw error
            response.json({
                "title" : "Post",
                "body" : result
            })
        })
    }catch(error){
        await response.json({
            "title":"error",
            "body":error.toString()
        })
    }
})
Router.put('/update/:id',async (request,response)=>{
    const id = request.params.id
    const {FirstName, LastName, Email} = request.body
    try{
        const connection = await dataBase.getConnection()
        const sql = "update Customers set FirstName = ?, LastName = ?, Email = ? where ID = ?"
        await connection.query(sql,[FirstName,LastName,Email,id],(error,result)=>{
            if(error)
                throw error
            response.json({
                "title" : "Put",
                "body" : result
            })
        })
    }catch(error){
        await response.json({
            "title":"error",
            "body":error
        })
    }
})
Router.delete('/delete/:id', async (request,response)=>{
    const id = request.params.id
    try {
        const connection = await dataBase.getConnection()
        const sql = 'delete from Customers where ID = ?'
        await connection.query(sql,[id],(error,result)=>{
            if(error)
                console.log(error)
            response.json({
                "title" : "delete",
                "body" : result
            })
        })
    }catch(error){
        await response.json({
            "title":"error",
            "body":error
        })
    }
})
module.exports = Router