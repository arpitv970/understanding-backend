const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://arpit:admin@cluster0.numu8.mongodb.net/?retryWrites=true&w=majority'
    )
        .then((client) => {
            console.log('Connected!!');
            callback(client);
        })
        .catch((err) => console.log(err));
};

module.exports = mongoConnect;