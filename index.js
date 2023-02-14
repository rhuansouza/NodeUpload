const express = require("express");
const app = express();
app.use(express.static('public'));
const multer = require("multer");//serve para trabalhar com upload de arquivo
const path = require("path");//serve para pegar a extensão de um arquivo
// Enable CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });



app.set('view engine','ejs');

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null,"uploads/");
    },
    filename: function(req,file,cb){
       // cb(null,file.originalname + Date.now() + path.extname(file.originalname) );
       cb(null,file.originalname);
    }
})
const upload = multer({storage});


app.post("/upload",upload.single("file"),(req, res) =>{
    res.send("Arquivo recebido");
})

app.get("/",(req, res) =>{
    res.render("index");
})

app.get("/baixar",(req,res)=>{
    var file = __dirname + '/../uploadrhuan/uploads/dragon-scales.png1676333684711.png';
    res.download(file)
})

app.listen(8080,() =>{
    console.log("Servidor rodando");
})