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

// Get all users
function get() {
    return db('users')
        .select('id', 'username', 'email', 'created_at', 'updated_at');
};

// Get an individual user by ID
async function getById(id) {
    let workouts = [];

    // Retrieves the user by their ID
    const user = await db('users')
        .where({ id })
        .select('id', 'username', 'email', 'created_at', 'updated_at')
        .first();

// Returns all workouts specific to that user if they exist
if (user) {
    workouts = await db('workouts as w')
        .leftJoin('workouts_exercises as we', 'we.workout_id', 'w.id')
        .leftJoin('exercises as e', 'we.exercise_id', 'e.id')
        .select('w.id', 'w.name')
        .where({ user_id: id })
        .groupBy('w.id')
        .count('e.id as exercises')

        console.log("WORKOUTS HERE" , workouts)
            return await {
                ...user,
                workouts: workouts
            };
        }
};

// This version of getting by username should be the version
// that is used by the client
async function getByUsername(username) {
    let workouts = [];

    // Retrieves the user by their username
    const user = await db('users')
        .where({ username })
        .select('id', 'username', 'email', 'created_at', 'updated_at')
        .first();

    // Returns all workouts specific to that user if they exist
    if (user) {
        workouts = await db('workouts as w')
            .leftJoin('workouts_exercises as we', 'we.workout_id', 'w.id')
            .leftJoin('exercises as e', 'we.exercise_id', 'e.id')
            .groupBy('w.name')
            .select('w.name as workout_name')
            .count('e.id as exercises')
            .where({ user_id: user.id });
    
        return await {
            ...user,
            workouts: workouts
        };
    }
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

// Add a user
function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => getById(id));
};

// Add a workout to a user
function addWorkout(workout){
    return db('workouts')
            .insert(workout, 'id');
}