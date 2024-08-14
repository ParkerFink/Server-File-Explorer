//node modules
const express = require("express")
const app = express()
const fs = require('fs')
const multer = require('multer')
const { config } = require("process")


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



//external function

//convert function
function sizeConvert(folder_size){

    // let roundNum = folder_size.toFixed(2)
    // console.log(roundNum,) 

    folder_size_length = folder_size.toString().length


    if (folder_size_length <= 3){
        
        
        console.log("converted size", folder_size, "Bytes")
        fs.writeFileSync('foldersize.txt', JSON.stringify(folder_size + " Bytes"))
        
    } else if (folder_size_length <= 6){

        let round = folder_size / 1000
        let x = console.log("converted size", folder_size / 1000, "kb")   
        fs.writeFileSync('foldersize.txt', JSON.stringify(Math.round(round * 100) / 100 + " kb"))

    } else if (folder_size_length <= 9) {

        let round = folder_size / 1000000
        let x = console.log("converted size", folder_size / 1000000, "MB")
        fs.writeFileSync('foldersize.txt', JSON.stringify(Math.round(round * 100) / 100 + " MB"))

    } else if (folder_size_length <= 12) {
        
        let round = folder_size / 1000000000
        let x = console.log("converted size", folder_size / 1000000000, "GB")
        fs.writeFileSync('foldersize.txt', JSON.stringify(Math.round(round * 100) / 100 + " GB"))

    } else if (folder_size_length <= 15) {

        let round = folder_size / 1000000000000
        let x = console.log("converted size", folder_size / 1000000000000, 'TB')
        fs.writeFileSync('foldersize.txt', JSON.stringify(Math.round(round * 100) / 100 + " TB"))

    } else if (folder_size_length <= 18) {

        let round = folder_size / 1000000000000000
        let x = console.log("converted size", folder_size / 1000000000000000, 'PB')
        fs.writeFileSync('foldersize.txt', JSON.stringify(Math.round(round * 100) / 100 + " PB"))

    }

}



//endpoints

//home endpoint
app.get('/', function(req,res){
    let filenames = fs.readdirSync(storageFolder)
    
    let folderSize = null
    
    for (file of filenames) {
        fs.stat(storageFolder + '/' + file, function(err, stats){
            if (err) {

                throw err

            } else {

                console.log(stats.size)
                folderSize = folderSize + stats.size
                
                sizeConvert(folderSize)

                console.log("Total Size", folderSize)
                
                }
            })
        }

    console.log(filenames)

    readFolderSize = "./foldersize.txt"

    res.render('index.ejs', {
    files: filenames,
    tabName: configFile.tabName,
    folderSize: fs.readFileSync(readFolderSize),
    version: configFile.version

        })
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
    console.log(`Server Version ${configFile.version}`)
    //console.log(`Server GUI ${configFile.ui_version}`)
    console.log("Server: Running")

})