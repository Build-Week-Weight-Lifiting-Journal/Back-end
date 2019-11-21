const db = require("../config/db-config");

module.exports = {
    get,
    editExercise,
    remove
}

function get() {
    return db('workouts_exercises')
}

async function editExercise(workoutData, workout_id, user_exercise_id) {
    const { name, reps, sets, region } = workoutData;

    const exercise = await db('exercises')
            .where({name})
            .first();

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

function remove(id) {
    return db('workouts_exercises')
            .where({id})
            .first()
            .del()
}