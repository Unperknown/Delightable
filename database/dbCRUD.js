const mongoClient = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017';
const dbName = 'Delightable';
const colName = 'users';

exports.insert = async data => {
    const client = await mongoClient.connect(dbURL, { useNewUrlParser: true }).catch(err => console.log(err));
    const db = client.db(dbName).collection(colName); 

    let result = await db.insertOne(data);

    client.close();

    return result;
};

exports.find = async query => {
    const client = await mongoClient.connect(dbURL, { useNewUrlParser: true }).catch(err => console.log(err));
    const db = client.db(dbName).collection(colName);

    let result = await db.findOne(query);

    client.close();

    return result;
}

exports.findAll = async (sortQuery) => {
    const client = await mongoClient.connect(dbURL, { useNewUrlParser: true }).catch(err => console.log(err));
    const db = client.db(dbName).collection(colName);

    let result = await db.find({}).sort(sortQuery).toArray();

    client.close();

    return result;
}

exports.update = async (filter, update) => {
    const client = await mongoClient.connect(dbURL, { useNewUrlParser: true }).catch(err => console.log(err));
    const db = client.db(dbName).collection(colName);

    let result = await db.findOneAndUpdate(filter, update);

    client.close();

    return result;
}