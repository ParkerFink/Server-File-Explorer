//node modules
const express = require("express")
const app = express()
const fs = require('fs')
const multer = require('multer')
const path = require("path")



//setup
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('Storage'))
app.use(express.static('Assets'))

//config file
let readFile = fs.readFileSync('config.json')
let configFile = JSON.parse(readFile)

let info = fs.readFileSync('info.json')
let infoFile = JSON.parse(info)

//multer storage folder setup
let temp = []
const storageFolder = configFile.storage
const storage = multer.diskStorage({
destination: (req,file, cb) => {
    cb(null, storageFolder + temp.join('/'))
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

function loopFolder(path) {
    let folder = fs.readdirSync(path)
    size = 0


    console.log("looping through", folder)

    for (item of folder) {
        let dir = fs.statSync(path + item)
        if (dir.isDirectory() == true) {
            console.log(item, "is dir")
            
            let x = fs.readdirSync(path + item)
            for (file of x) {
                console.log(file)
                size = size + dir.size
            }
            console.log(size)
            
        }
    }


}

// let x = fs.readdirSync(path + item)
// console.log("files of", x)




// runs when main page is loaded
function onLoad() {

    let size = []
    let filenames = fs.readdirSync(storageFolder + temp.join('/'))
    
    
    
    for (file of filenames) {
        let x = fs.statSync(storageFolder + temp.join('/') + "/" + file)
        
        size.push(sizeConvert(x.size))
        
        console.log(size)

    }

        

    //loopFolder(storageFolder)

    //let dirSize = getFolderSize.loose(storageFolder)

        let totalSize = 0
    

    //checks folder cap
    let full = null
    if (((totalSize / configFile.folderCap) * 100).toFixed(2) >= configFile.folderCap){
        full = "Server is almost full!"
        console.log("Server Is Getting Full!")
    } else {
        
        //full = ""
    }

//return list
return {
    filenames,
    full,
    size,
    totalSize

    }
}


//endpoints



//home endpoint
app.get('/', function(req,res){
    let onload = onLoad()
    console.log(temp.join('/'))
    //temp.length = 0
    
    
    //renders the main page
    res.render('index.ejs', {
    files: onload.filenames,
    tabName: configFile.tabName,
    folderSize: sizeConvert(onload.totalSize),
    version: infoFile.version, 
    folderCap: sizeConvert(configFile.folderCap),
    percentUsed: ((onload.totalSize / configFile.folderCap) * 100).toFixed(2),
    path: temp,
    size: onload.size, 
    currentDir: temp.join("/") + "/",
    err: onload.full

        })
    })




//home post endpoint
app.post('/', uploadStorage.single("filename"), function(req,res){
    res.redirect('/')
})

app.post('/nvgBack', function(req,res){
    let folder = req.body.folder
    console.log("Clicked ", folder)

    let x = temp.indexOf(folder)    
    temp.length = x + 1

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
                        fs.unlinkSync(temp.join('/') + deleteFile)
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


//view folders 

app.post('/view', function(req,res){

    let folder = req.body.clickedFolder
    let dir = storageFolder + temp.join('/') + folder
    
    let stats = fs.statSync(dir)
    
    //is a folder
    if (stats.isDirectory() == true) {
        console.log("Is Directory")
        temp.push(folder + '/')
        res.redirect('/')
        
    //is a file
    } else if (stats.isFile() == true) {
        console.log("Is File")
        //temp.push(folder)
        res.redirect('/' + temp.join('/') + folder)
        
    }
   
})

app.post('/back', function(req,res){
    temp.length= 0
    res.redirect('/')
})

app.post('/newFolder', function(req,res){

    let x = req.body.newFolder
    console.log("Created ", x)

    fs.mkdirSync(storageFolder + temp.join('/') + "/" + x)
 
    temp.push(x)
    
    res.redirect('/')
    

})

//listen server
app.listen(configFile.port, configFile.port, function(){
    console.log(`Server: ${configFile.ip}:${configFile.port}`)
    console.log(`Server Version: ${configFile.version}`)
    console.log(`Server Folder Cap: ${configFile.folderCap}`)
    console.log(`Repo at https://github.com/ParkerFink/Server-File-Explorer`)
    console.log("Server: Running")
    
   
})