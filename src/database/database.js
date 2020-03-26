const mongo = require('mongodb').MongoClient

// Middleware to connect foreach request
exports.connectDB = function (req, res, next){
    //conectando o banco
    
    const dbUrl = process.env.MONGO_CONNECTION_STR || 'mongodb://localhost/ufrj'

    mongo.connect(dbUrl, function (err, client) {
        if (err) {
            console.log(err)
            res.status(501).json(err)
            return 
        }
        res.database = client.db('ufrj').collection("covid19_test1")
        next()
    })
}
