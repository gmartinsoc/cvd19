const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'google',
   // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyBy5sPPL58np_vCYP9laO4QbJdH3WT71tc', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);


// GET /api/ocorrencias/data?situacao=??

exports.get = (req, res, next) => {
    // situacao = req.query.situacao
    situacao = req.query.situacao
    
    //console.log(req.query.situacao)
    res.database.find({}, { coords: 1, _id: 0 } ).toArray(function (err, result) {
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
                    //montar req e viacep
                    data[result[cont].SituacaoSaude].push(result[cont].coords)                
                }
            }
        }
        res.json({ data });
    });
}



// POST /api/cadastrar

exports.post = (req, res, next) => {
    try {
        let ocorrencia = res.ocorrencia
        
        ocorrencia['coords']="nPreenchido"
        //pegando coords
        geocoder.geocode(ocorrencia.endereco +","+ ocorrencia.cep)
                    .then(function(geo) {
                                if(geo.length !==0) {
                                    ocorrencia['coords']=[geo[0].latitude,geo[0].longitude]
                                }
                                //console.log(obj)
                                // TODO: ocorrencia.save()
                                res.database.insertOne(ocorrencia)
                                res.send("200")
                        })
                
        //res.redirect("/")
      }
      catch(err) {
        res.send('401')
      }
}



// // POST (CREATE)
// exports.post = (req, res, next) => {
//     res.status(201).send('Requisição recebida com sucesso!');
// };

// // PUT (UPDATE)
// exports.put = (req, res, next) => {
//     let id = req.params.id;
//     res.status(201).send(`Requisição recebida com sucesso! ${id}`);
// };

// // DELETE (DELETE)
// exports.delete = (req, res, next) => {
//     let id = req.params.id;
//     res.status(200).send(`Requisição recebida com sucesso! ${id}`);
// };