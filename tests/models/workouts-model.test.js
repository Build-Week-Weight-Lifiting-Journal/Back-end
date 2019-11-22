const db = require('../../config/db-config.js');

const { edit, remove, findById, addExercise } = require("../../models/workouts-model");

describe("workouts-model", () => {

    beforeEach(async () => {
        await db('workouts').truncate();
        await db('exercises').truncate();
        await db('workouts_exercises').truncate();
        await db('users').truncate();
        await db('users').insert({
            username: "thisisatest",
            email: "thisisatest@gmail.com",
            password: "thisisatest"
        })
        await db('workouts').insert({
            name: 'stronk',
            user_id: 1
        });
    });

    describe("edit", () => {
       
        it("should edit a workout", async () => {
            const changes = {name: 'stronker', user_id: 1}
            await edit(changes, 1)

            const workouts = await db("workouts")
            expect(workouts[0].name).toBe('stronker')
        });
    });

    describe("remove", () => {
        it("should remove the workout", async () => {
            await remove(1)
            const workouts = await db("workouts");
            expect(workouts[0]).toBeUndefined();
        });
    });

    describe("findById", () => {
        it("should return the workout by id", async () => {
            const workout = await findById(1);

            expect(workout.workout_id).toBe(1);
        });
    });

    describe("addExercise", () => {
        it('should add an exercise to the workout', async () => {
            const exercise = {name: 'Squats', region: 'quads', sets: 3, reps: 10}
            await addExercise(exercise, 1);
            const workouts = await db('workouts_exercises');

            expect(workouts[0].workout_id).toBe(1);
            expect(workouts[0].exercise_id).toBe(1);
        })
    })
})