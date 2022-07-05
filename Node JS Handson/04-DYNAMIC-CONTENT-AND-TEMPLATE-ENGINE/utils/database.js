const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://arpit:admin@cluster0.numu8.mongodb.net/shop?retryWrites=true&w=majority'
    )
        .then((client) => {
            console.log('Connected!!');
            _db = client.db();
            callback(client);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No DB found!!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;