const request = require("supertest");

const server = require("../api/server");
const db = require("../config/db-config");
const generateToken = require("../auth/generateToken");

describe("User Router Tests", () => {

    beforeEach(async () => {
        await db('users').truncate();
    });
    
    describe("PUT /workouts/:workout_id/exercises/:id", () => {
        // it("returns status code 201", async () => {
        //     const token = generateToken({ id: 1, username: "exampleuser" });
            
        //     await db('workouts').truncate();
        //     await db('workouts_exercises').truncate();
        //     await db('exercises').truncate();

        //     await db('exercises').insert({ name: "Squats", region: "Quads" });
        //     await db('workouts').insert({ name: "New Workout", user_id: 1 });
        //     await db('workouts_exercises').insert({
        //         workout_id: 1,
        //         exercise_id: 1,
        //         sets: 10,
        //         reps: 10
        //     })

        //     const res = await request(server)   
        //         .put("/api/workouts/1/exercises/1")
        //         .send({
        //             name: "Crunches",
        //             region: "Abs",
        //             sets: 10,
        //             reps: 10
        //         })
        //         .set("authorization", token)
            
        //     await expect(res.status).toBe(201);
        // });

        it("returns status code 201", async () => {
            // const token = generateToken({ id: 1, username: "exampleuser" });

            // await db('workouts').truncate();
            // await db('workouts_exercises').truncate();
            // await db('exercises').truncate();

            // await db('exercises').insert({ name: "Squats", region: "Quads" });
            // await db('workouts').insert({ name: "New Workout", user_id: 1 });
            // await db('workouts_exercises').insert({
            //     workout_id: 1,
            //     exercise_id: 1,
            //     sets: 10,
            //     reps: 10
            // })

            // let exercise_workout = await db('workouts_exercises').where({ id: 1 }).first();
            
            // await request(server)   
            // .put("/api/workouts/1/exercises/1")
            // .send({
            //     name: "Crunches",
            //     region: "Abs",
            //     sets: 10,
            //     reps: 10
            // })
            // .set("authorization", token)

            // exercise_workout = await db('workouts_exercises').where({ id: 1 }).first();

            // await expect(exercise_workout.exercise_id).toBe(2);
        });

        // it("returns all users in database", async () => {
        //     const users = await db('users');

        //     await expect(users).toHaveLength(2);   
        // });
    });
});