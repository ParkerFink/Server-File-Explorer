const express = require('express')
const app = express()
const fs = require('fs')



app.use(express.urlencoded({extended: true}))
app.use(express.static('public/Files'))
app.set('view engine', 'ejs')


const port = 6969
const ip = '127.0.0.1'
const upload = require('./upload');

app.get('/', function(req, res){
    const Files = fs.readdirSync('./Files')
    res.render('index.ejs', {
        Files: Files
    })
   
})

app.post('/', upload.single('submitedFile'), function(req,res){
    res.redirect('/')
})



app.listen(port, ip, function(){
    console.log('Server Running')
    
})