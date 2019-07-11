const db = require('../database/dbCRUD');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.create = user => {
    return db.find({ $or : [{ ID: { $eq: user.ID }}, { username: { $eq: user.username }}]})
        .then(async result => {
            if (result === null) {
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                db.insert({ username: user.username, ID: user.ID, password: hashedPassword, createdDate: new Date().toISOString(), score: 0 });

                return 'User Created';
            } else {
                return 'User Not Created';
            }
        });
};

exports.validate = async user => {
    const result = await db.find({ ID : { $eq: user.ID }});
    const matched = await bcrypt.compare(user.password, result.password);

    if (matched) {
        return result;
    } else {
        return PromiseRejectionEvent(new Error('User Not Match'));
    }
};

exports.get = user => {
    return db.find({ ID: { $eq: user.ID }});
};

exports.getAll = () => {
    return db.findAll({ score: -1 });
};

exports.updateValue = (username, score) => {
    return db.update({ username: { $eq: username }}, { $inc: { score : score } });
}