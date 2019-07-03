const db = require('../database/dbCRUD');

exports.create = user => {
    return db.find({ ID: { $eq: user.ID }})
        .then(result => {
            if (result === null) {
                db.insert({ username: user.username, ID: user.ID, password: user.password, createdDate: new Date().toISOString() });
            }
        });
};

exports.validate = user => {
    return db.find({ ID: { $eq: user.ID }, password: { $eq: user.password }});
};

exports.authentication = user => {
    return db.find({ ID: { $eq: user.ID }});
};
