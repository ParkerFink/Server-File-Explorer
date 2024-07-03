//node modules
const express = require("express")
const app = express()
const fs = require('fs')

//setup
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('Storage'))
const storageFolder = 'Storage/'

//endpoints
app.get('/', function(req,res){
    let filenames = fs.readdirSync(storageFolder)
    console.log(filenames)
    res.render('index.ejs', {
        files: filenames
    })

})

//listen server
app.listen(8080, '127.0.0.1', function(){
    console.log("Server Running")
})