const express = require("express")
const app = express()

app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')


app.get('/', function(req,res){
    res.render('index.ejs')
})


app.listen(8080, '127.0.0.1', function(){
    console.log("Server Running")
})