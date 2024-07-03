//node modules
const express = require("express")
const app = express()
const fs = require('fs')
const multer = require('multer')

//setup
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('Storage'))
const storageFolder = 'Storage/'

function deleteFile(deleteFile) {
    fs.rmdirSync("storage/" + 'deleteFile')
}


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
        files: filenames
    })

   

})

app.post('/', uploadStorage.single("filename"), function(req,res){
    res.redirect('/')
})

//listen server
app.listen(8080, '127.0.0.1', function(){
    console.log("Server Running")
})