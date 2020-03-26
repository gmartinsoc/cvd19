const mongo = require('mongodb').MongoClient

// Middleware to connect foreach request
exports.connectDB = function (req, res, next){
    //conectando o banco
    const dbUrl = 'mongodb://root:MongoDB2019!@192.168.99.100:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false'

    mongo.connect(dbUrl, function (err, client) {
        if (err) {
            console.log(err)
            res.status(501).json(err)
            return 
        }
        // db = client.db('ufrj').collection("covid19_test1")
        res.database = client.db('ufrj').collection("covid19_test1")
        next()
    })
}
