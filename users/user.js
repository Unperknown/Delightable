const db = require('../database/dbCRUD');

exports.create = user => {
    return db.find({ $or : [{ ID: { $eq: user.ID }}, { username: { $eq: user.username }}]})
        .then(result => {
            if (result === null) {
                db.insert({ username: user.username, ID: user.ID, password: user.password, createdDate: new Date().toISOString(), score: 0 });
                return 'User Created';
            } else {
                return 'User Not Created';
            }
        });
};

exports.validate = user => {
    return db.find({ ID: { $eq: user.ID }, password: { $eq: user.password }});
};

exports.authentication = user => {
    return db.find({ ID: { $eq: user.ID }});
};

exports.getAll = () => {
    return db.findAll({ score: -1 });
};

exports.updateValue = (username, score) => {
    return db.update({ username: { $eq: username }}, { $inc: { score : score } });
}