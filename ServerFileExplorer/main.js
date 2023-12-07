const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const port = 6969
const ip = '127.0.0.1'
const folder = fs.readdirSync('./Files')



app.get('/', function(req, res){
    res.render('index.ejs')
   
})



app.listen(port, ip, function(){
    console.log('Server Running')
    

})