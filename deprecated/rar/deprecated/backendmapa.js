var express = require('express');
var app = express();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true })
app.engine('html', require('ejs').renderFile)

//conectando o banco
const mongo = require('mongodb').MongoClient
const dbUrl = 'mongodb://localhost/mydb'
mongo.connect(dbUrl, function (err, client) {
  if (err) return console.log(err)
  db = client.db('mydb').collection("covid19")

  app.listen(3000, function () {
    console.log('Escutando porta 3000:');
  })
})

app.get('/enderecos', function (req, res) {
  db.find({}, { projection: { endereco: 1, _id: 0 } }).toArray(function (err, result) {
    if (err) throw err;
    var cont
    var enderecos = []
    for (cont = 0; cont < Object.keys(result).length; cont++) {
      enderecos.push(result[cont].endereco)
    }
    enderecos = enderecos.filter(e => {
      return e != null
    })
    res.json({ data: enderecos });
  });


});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/Geocoding.html')
})