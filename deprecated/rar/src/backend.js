const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true })

const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'google',
   // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyBy5sPPL58np_vCYP9laO4QbJdH3WT71tc', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);

//conectando o banco
const mongo = require('mongodb').MongoClient
const dbUrl = 'mongodb://localhost/ufrj'
    mongo.connect(dbUrl, function (err, client) {
    if (err) return console.log(err)
    db = client.db('ufrj').collection("covid19_test")

    app.listen(3000, function () {
        console.log('Escutando porta 3000:')
    })
    })

//roteamento

    app.get("/logoufrj", (req, res) => {
        res.sendFile(__dirname+"/assets/logoufrj.jpg");
      });
      app.get("/logocorona", (req, res) => {
        res.sendFile(__dirname+"/assets/logocorona.jpg");
      });
      app.get("/logolab", (req, res) => {
        res.sendFile(__dirname+"/assets/logolab.jpg");
      });
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/view/home.html');
        });

    app.get('/anamnese', function (req, res) {
        res.sendFile(__dirname + '/view/form.html');
        });

    app.get('/ocorrencias', function (req, res) {
        res.sendFile(__dirname + '/view/mapa.html')
        })


    app.get('/ocorrencias/data', function (req, res) {
        situacao = req.query.situacao
        //console.log(req.query.situacao)
        db.find({}, { coords: 1, _id: 0 } ).toArray(function (err, result) {
            //console.log("end  "+ JSON.stringify(result[1]))
            if (err) throw err;
            var cont
            var data={}
            for (cont = 0; cont < Object.keys(result).length; cont++) {
                if(result[cont].coords != null  && (result[cont].coords != "nPreenchido" && result[cont].SituacaoSaude != "nPreenchido") && (situacao == 'todos' || result[cont].SituacaoSaude == situacao)){
                     if (!data[result[cont].SituacaoSaude]){
                        data[result[cont].SituacaoSaude]=[result[cont].coords]                  
                    }
                    else if (data[result[cont].SituacaoSaude]){
                        data[result[cont].SituacaoSaude].push(result[cont].coords)                
                    }
                }
            }
            res.json({ data });
        });
    });


    app.post('/cadastrar', function (req, res) {
        try {
           var obj = req.query.json
            obj = JSON.parse(obj.toString())
            obj['coords']="nPreenchido"
            //pegando coords
            geocoder.geocode(obj.endereco)
                        .then(function(geo) {
                                    obj['coords']=[geo[0].latitude,geo[0].longitude]
                                    console.log(obj)
                                    db.insertOne(obj)
                                    res.send("200")
                            })
                    
            //res.redirect("/")
          }
          catch(err) {
            res.send('401')
          }
        })


