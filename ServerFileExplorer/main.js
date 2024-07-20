//node modules
const express = require("express")
const app = express()
const fs = require('fs')
const multer = require('multer')
const { config } = require("process")
const admz = require('adm-zip')

//setup
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('Storage'))
app.use(express.static('Assets'))

//config file
let readFile = fs.readFileSync('config.json')
let configFile = JSON.parse(readFile)



//multer storage folder setup
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

//home endpoint
app.get('/', function(req,res){
    let filenames = fs.readdirSync(storageFolder)
    let folderSize = 0

    for (file of filenames) {
        fs.stat("Storage/" + file, function(err, stats){
            if (err) {

                throw err

            } else {

                console.log(stats.size)
                folderSize = folderSize + stats.size
                console.log("Total Size", folderSize)

            }
            console.log(filenames)
            res.render('index.ejs', {
            files: filenames,
            tabName: configFile.tabName,
            folderSize: folderSize
            })
        })
    }  
})


//home post endpoint
app.post('/', uploadStorage.single("filename"), function(req,res){
    res.redirect('/')
})


//delete endpoint
app.post('/delete', function(req,res){
    deleteFile = req.body.file

        if (deleteFile == undefined) {
            res.redirect('/')
        } else {
                if (Array.isArray(deleteFile) == true){
                    for (item of deleteFile) {
                        //console.log(deleteFile.length)
                        fs.unlinkSync(storageFolder + item)
                        console.log("Deleted: " + item)
                    }
                } else {
                    fs.unlinkSync(storageFolder + deleteFile)
                    console.log("Deleted: " + deleteFile)
                }
                
            res.redirect('/')
        }
    })



//listen server
app.listen(configFile.port, configFile.port, function(){
    console.log(`Server: ${configFile.ip}:${configFile.port}`)
})