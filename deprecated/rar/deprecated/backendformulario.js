var express = require('express');
var app = express();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true })


//conectando o banco
const mongo=require('mongodb').MongoClient
const dbUrl='mongodb://localhost/mydb'
mongo.connect(dbUrl, function(err, client){
  if (err) return console.log(err)
db=client.db('mydb').collection("covid19")

  app.listen(3000, function () {
    console.log('Escutando porta 3000:');
  })
})


app.get('/', function (req, res) {
  res.sendFile(__dirname+'/formulario.html');

});

app.post('/bubu',function(req, res){
  obj=req.query.json
  console.log(obj)
  obj=JSON.parse(obj.toString())
  console.log(obj)
  db.insertOne(obj)
  res.send('200')
    
})


