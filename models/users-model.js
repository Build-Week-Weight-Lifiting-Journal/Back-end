const db = require("../config/db-config");

module.exports = {
    get,
    getById,
    getByUsername,
    findByUsername,
    findByEmail,
    add,
    addWorkout
};

function get() {
    return db('users')
        .select('id', 'username', 'email', 'created_at', 'updated_at');
};

function getById(id) {
    return db('users')
        .select('id', 'username', 'email', 'created_at', 'updated_at')
        .where({ id })
        .first();
};

// This version of getting by username should be the version
// that is used by the client
function getByUsername(username) {
    return db('users')
        .select('id', 'username', 'email', 'created_at', 'updated_at')
        .where({ username })
        .first();
};

// This version of finding by username returns the password
// ONLY used for authentication purposes
function findByUsername(username) {
    return db('users')
        .where({ username })
        .first();
};

// This is for authentication purposes only
// DO NOT provide access to client
function findByEmail(email) {
    return db('users')
        .where({ email })
        .first();
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => getById(id));
};

function addWorkout(workout, user_id){
    return db('workouts')
            .insert(workout)
            .where('users.id', '=', user_id)
}