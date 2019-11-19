const db = require("../config/db-config");

module.exports = {
    get
}

function get() {
    return db('workouts_exercises')
}