const Workouts = require("../models/workouts-model");

// Gets all of the users workouts and makes sure the workout name isn't already being used
module.exports = async (req, res, next) => {
    const workoutList = await Workouts.test(req.params.id);

    // If the user has workouts, saved them into an array, and check if the array includes the requested new workout name
    if (workoutList.length) {
        const workouts = await workoutList.map(workout => workout.name);
        
        // If the workout name is being used, throw an error
        if (workouts.includes(req.body.name)) {
            res.status(404).json({ message: `That user already has a workout with that name: ${req.body.name}.` });
        } else {
            next();
        }
    } else {
        // If the user doesn't have any workouts, proceed the the endpoint
        next();
    }
};