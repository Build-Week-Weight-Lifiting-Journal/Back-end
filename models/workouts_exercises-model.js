const db = require("../config/db-config");

module.exports = {
    get,
    editExercise,
    remove
}

// Get all workouts and their associated exercises from the connecting third table
function get() {
    return db('workouts_exercises')
}

// Edit an exercise that belongs to a workout
async function editExercise(workoutData, workout_id, user_exercise_id) {
    const { name, reps, sets, region } = workoutData;

    // Find the exercise by it's name, that is provided in request
    const exercise = await db('exercises')
            .where({name})
            .first();

    // If the exercise is found in the database, use it's ID
    // to update the workout it belongs to in the connecting table
    if(exercise) {
       return await db('workouts_exercises')
            .update({
                reps,
                sets,
                workout_id,
                exercise_id: exercise.id
            })
            .where({id: user_exercise_id})
    } else {
        // If the exercise doesn't exist, add it to the exercises DB first
        // Then use that newly created exercise's ID to edit the exercise
        // that is connected to the workout
        const [ id ] = await db('exercises')
        .insert({ 
            name,  
            region
        });

        return await db('workouts_exercises')
            .update({
                reps,
                sets,
                workout_id,
                exercise_id: id
            })
            .where({id: user_exercise_id})   
    }
};

// Delete an exercise that belongs to a workout
// This does NOT delete the exercise from existence, ONLY from the workout
function remove(id) {
    return db('workouts_exercises')
            .where({id})
            .first()
            .del()
}