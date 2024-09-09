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





//convert function
function sizeConvert(folder_size){

    
    folder_size_length = folder_size.toString().length


    if (folder_size_length <= 3){
        
        
        console.log("converted size", folder_size, "Bytes")
        var y = JSON.stringify(folder_size + " Bytes")
        
    } else if (folder_size_length <= 6){

        let round = folder_size / 1000
        let x = console.log("converted size", folder_size / 1000, "kb")   
        var y = JSON.stringify(Math.round(round * 100) / 100 + " kb")

    } else if (folder_size_length <= 9) {

        let round = folder_size / 1000000
        let x = console.log("converted size", folder_size / 1000000, "MB")
        var y = JSON.stringify(Math.round(round * 100) / 100 + " MB")

    } else if (folder_size_length <= 12) {
        
        let round = folder_size / 1000000000
        let x = console.log("converted size", folder_size / 1000000000, "GB")
        var y = JSON.stringify(Math.round(round * 100) / 100 + " GB")

    } else if (folder_size_length <= 15) {

        let round = folder_size / 1000000000000
        let x = console.log("converted size", folder_size / 1000000000000, 'TB')
        var y = JSON.stringify(Math.round(round * 100) / 100 + " TB")

    } else if (folder_size_length <= 18) {

        let round = folder_size / 1000000000000000
        let x = console.log("converted size", folder_size / 1000000000000000, 'PB')
        var y = JSON.stringify(Math.round(round * 100) / 100 + " PB")


    }

    return y

}



//endpoints

//home endpoint
app.get('/', function(req,res){
    let filenames = fs.readdirSync(storageFolder)
    
    if (configFile.folderCap == null) {

        console.log("No File Cap")

    } else {

    }   
        let totalSize = 0
        let fileSizes = []
        for (file of filenames) {
            let x = fs.statSync(storageFolder + file)
            totalSize += x.size
            //fileSizes.push(x.size)
            //console.log(fileSizes)
        }
        console.log(totalSize)


        let full = null
        if (((totalSize / configFile.folderCap) * 100).toFixed(2) >= 10){
            full = "Server is almost full!"
            console.log("Server Is Getting Full!")
        } else {
            full = ""
        }

    res.render('index.ejs', {
    files: filenames,
    tabName: configFile.tabName,
    folderSize: sizeConvert(totalSize),
    version: configFile.version, 
    folderCap: sizeConvert(configFile.folderCap),
    percentUsed: ((totalSize / configFile.folderCap) * 100).toFixed(2),
    sizeErr: full

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

            try {
                    if (Array.isArray(deleteFile) == true){
                        for (item of deleteFile) {
                            fs.unlinkSync(storageFolder + item)
                            console.log("Deleted: " + item)
                        }
                    } else {
                        fs.unlinkSync(storageFolder + deleteFile)
                        console.log("Deleted: " + deleteFile)
                    }    
            }

            catch(err){
                console.log(err)

            } 

            finally {
            
                fs.rmdirSync(storageFolder + deleteFile, {recursive: true})


            }

            res.redirect('/')
        }
    })


//creates a new directory
app.post('/newDir', function(req,res){

    newFolder = req.body.newDir
    console.log(newFolder)

    fs.mkdirSync(storageFolder + "/" + newFolder)

    res.redirect('/')

})



//listen server
app.listen(configFile.port, configFile.port, function(){
    console.log(`Server: ${configFile.ip}:${configFile.port}`)
    console.log(`Server Version: ${configFile.version}`)
    console.log(`Server Folder Cap: ${configFile.folderCap}`)
    console.log("Server: Running")
    

})