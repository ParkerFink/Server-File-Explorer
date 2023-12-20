//modules
const express = require('express')
const app = express()
const fs = require('fs')




//setup
app.use(express.urlencoded({extended: true}))
app.use(express.static('./Files'))
app.use(express.static('./CSS'))
app.set('view engine', 'ejs')

const upload = require('./upload');





//reads version file
const version = fs.readFileSync('version.txt')


//reads config.json
let parsedFile = JSON.parse(fs.readFileSync('config.json'))
const setupConfig = {
    ip: parsedFile.ip,
    port: parsedFile.port
}




//main directory
app.get('/', function(req, res){
    var File = fs.readdirSync('./Files')
    console.log(File)
    res.render('index.ejs', {
        Files: File,
        version: version
    })
   
})

app.post('/', upload.single('submitedFile'), function(req,res){
    res.redirect('/')
})




//listen server
app.listen(setupConfig.port, setupConfig.ip, function(){
    console.log("Server IP: " + setupConfig.ip)
    console.log("Server Port: " + setupConfig.port)
    console.log("Server Version:", JSON.parse(version))
    
})