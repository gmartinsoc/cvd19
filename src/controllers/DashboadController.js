

// GET /api/dashboard/data

exports.get = (req, res, next) => {
    
    //console.log(req.query.situacao)
    res.database.find({}, {_id: 0 } ).toArray(function (err, result) {
        if (err) throw err;
        for (cont = 0; cont < Object.keys(result).length; cont++) {
            delete result[cont]._id
        }
        res.json(result);
    });
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