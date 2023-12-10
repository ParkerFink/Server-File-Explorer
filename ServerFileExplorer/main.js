const express = require('express')
const fs = require('fs')

const app = express()

saveDir = './Files'

app.use(express.urlencoded({extended: true}))
app.use(express.static('Files'))
app.set('view engine', 'ejs')

const port = 6969
const ip = '127.0.0.1'
const Files = fs.readdirSync('./Files')



app.get('/', function(req, res){
    res.render('index.ejs', {
        Files: Files
    })
   
})

app.post('/', function(req,res){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      var newpath = 'C:/Users/Parker Fink/' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
       
      });
    })
})



app.listen(port, ip, function(){
    console.log('Server Running')
    
})