//node modules
const express = require("express")
const app = express()
const fs = require('fs')
const multer = require('multer')


//setup
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('Storage'))

//config file
let readFile = fs.readFileSync('config.json')
let configFile = JSON.parse(readFile)


function deleteFile(path){
    //fs.rmdirSync(path)
    console.log(path)

}

//const cwd = process.cwd()
const storageFolder = 'Storage/'


const storage = multer.diskStorage({
destination: (req,file, cb) => {
    cb(null, storageFolder)
},
filename: (req,file, cb) => {
    cb(null, file.originalname)
},
})
const uploadStorage = multer({storage: storage})



//endpoints
app.get('/', function(req,res){
    let filenames = fs.readdirSync(storageFolder)
    console.log(filenames)
    res.render('index.ejs', {
        files: filenames,
        tabName: configFile.tabName,
        mainPath: configFile.mainPath
    })
})

app.post('/', uploadStorage.single("filename"), function(req,res){
    res.redirect('/')
})

//listen server
app.listen(8080, '127.0.0.1', function(){
    console.log(`Server: ${configFile.ip}:${configFile.port}`)
})