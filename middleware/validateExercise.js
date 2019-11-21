// Ensures that all column values of the table are being filled when
// attempting to add an exercise to a workout
module.exports = (exercise) => {
    const errors = [];

    if (!exercise.name) {
        errors.push('Please provide a name for the exercise.')
    }

    if (!exercise.region) {
        errors.push('Please provide a region of the body that this exercise targets.')
    }

    if (!exercise.reps) {
        errors.push('Please specify the amount of reps performed for each set.')
    }

    if (!exercise.sets) {
        errors.push('Please specify the amount of sets performed for this exercise.')
    }

    return {
        isSuccessful: !Boolean(errors.length),
        errors
    }
};