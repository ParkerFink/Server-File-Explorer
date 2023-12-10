//modules
const express = require('express')
const app = express()
const fs = require('fs')
const AutoGitUpdate = require('auto-git-update')



//setup
app.use(express.urlencoded({extended: true}))
app.use(express.static('./Files'))
app.set('view engine', 'ejs')




const upload = require('./upload');

//reads config.json
let parsedFile = JSON.parse(fs.readFileSync('config.json'))
const setupConfig = {
    ip: parsedFile.ip,
    port: parsedFile.port
}


//reads version file
const version = fs.readFileSync('version.txt')

//auto update checker
const config = {
    repository : 'https://github.com/ParkerFink/Server-File-Explorer',
    fromReleases: true,
    tempLocation: 'C:/Users/Parker Fink/Desktop/tmp/',
    executeOnComplete: __dirname + '/START.bat',
    exitOnComplete: true
}

const updater = new AutoGitUpdate(config)
updater.autoUpdate






//main directory
app.get('/', function(req, res){
    let File = fs.readdirSync('./Files')
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