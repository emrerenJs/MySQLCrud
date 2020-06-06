'use strict'
const Express = require('express')
const App = Express()
//Services
const BodyParser = require('body-parser')
App.set('view engine','pug')
//Configurations
App.use(Express.static('wwwroot'))
App.use(BodyParser.json())
App.use(BodyParser.urlencoded({extended : true}))
//Controllers
const Home = require('./Controllers/HomeController')
App.use(['/home','/'],Home)

App.listen('3000',()=>{
    console.log("Listening 3000..")
})