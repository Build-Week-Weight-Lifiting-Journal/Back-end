const db = require("../config/db-config");

module.exports = {
    get,
    getById,
    getByUsername,
    add
};

function get() {
    return db('users')
        .select('id', 'username', 'created_at', 'updated_at');
};

function getById(id) {
    return db('users')
        .select('id', 'username', 'created_at', 'updated_at')
        .where({ id })
        .first();
};

function getByUsername(username) {
    return db('users')
        .where({ username })
        .first();
};

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => getById(id));
};