var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var apiRouter = require("./apiRouteur").router;

var userLayer = require("./routes/userLayer");
/*var todolayer = require("./routes/todoLayer");*/

var app = express();
var port = 8095; //TODO mettre dans un fichier de paramètres

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(function (req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/", apiRouter);

console.log("Serveur démarré sur le port "+port);

app.listen(port);