const request = require("supertest");

const server = require("../../api/server");
const db = require("../../config/db-config");
const generateToken = require("../../auth/generateToken");

describe("User Router Tests", () => {

    beforeEach(async () => {
        await db('users').truncate();
    });
    
    describe("PUT /workouts/:workout_id/exercises/:id", () => {
        it("returns status code 201", async () => {
            const token = generateToken({ id: 1, username: "exampleuser" });
            
            await db('workouts').truncate();
            await db('workouts_exercises').truncate();
            await db('exercises').truncate();

            await db('users').insert({
                username: "exampletest",
                email: "exampletest@gmail.com",
                password: "exampletest"
            })

            await db('exercises').insert({ name: "Squats", region: "Quads" });
            await db('workouts').insert({ name: "New Workout", user_id: 1 });
            await db('workouts_exercises').insert({
                workout_id: 1,
                exercise_id: 1,
                sets: 10,
                reps: 10
            })

            const res = await request(server)   
                .put("/api/workouts/1/exercises/1")
                .send({
                    name: "Crunches",
                    region: "Abs",
                    sets: 10,
                    reps: 10
                })
                .set("authorization", token)
            
            await expect(res.status).toBe(201);
        });

        it("changes the exercise in the table, to the exercise provided in request", async () => {
            const token = generateToken({ id: 1, username: "exampleuser" });
            
            await db('workouts').truncate();
            await db('workouts_exercises').truncate();
            await db('exercises').truncate();

            await db('users').insert({
                username: "exampletest",
                email: "exampletest@gmail.com",
                password: "exampletest"
            })

            await db('exercises').insert({ name: "Squats", region: "Quads" });
            await db('workouts').insert({ name: "New Workout", user_id: 1 });
            await db('workouts_exercises').insert({
                workout_id: 1,
                exercise_id: 1,
                sets: 10,
                reps: 10
            })

            const res = await request(server)   
                .put("/api/workouts/1/exercises/1")
                .send({
                    name: "Crunches",
                    region: "Abs",
                    sets: 10,
                    reps: 10
                })
                .set("authorization", token)
            
            const workout_exercises = await db('workouts_exercises');

            await expect(workout_exercises[0].exercise_id).toBe(2);
        });
    });

    
    describe("DELETE /workouts/:workout_id/exercises/:id", () => {
        it("returns status code 200", async () => {
            const token = generateToken({ id: 1, username: "exampleuser" });
            
            await db('workouts').truncate();
            await db('workouts_exercises').truncate();
            await db('exercises').truncate();

            await db('users').insert({
                username: "exampletest",
                email: "exampletest@gmail.com",
                password: "exampletest"
            })

            await db('exercises').insert({ name: "Squats", region: "Quads" });
            await db('workouts').insert({ name: "New Workout", user_id: 1 });
            await db('workouts_exercises').insert({
                workout_id: 1,
                exercise_id: 1,
                sets: 10,
                reps: 10
            })


            const res = await request(server)   
                .delete("/api/workouts/exercises/1")
                .set("authorization", token)
            
            await expect(res.status).toBe(200);
        });

        it("returns a message confirmation, and expect exercise to deleted", async () => {
            const token = generateToken({ id: 1, username: "exampleuser" });
            
            await db('workouts').truncate();
            await db('workouts_exercises').truncate();
            await db('exercises').truncate();

            await db('users').insert({
                username: "exampletest",
                email: "exampletest@gmail.com",
                password: "exampletest"
            })

            await db('exercises').insert({ name: "Squats", region: "Quads" });
            await db('workouts').insert({ name: "New Workout", user_id: 1 });
            await db('workouts_exercises').insert({
                workout_id: 1,
                exercise_id: 1,
                sets: 10,
                reps: 10
            })

            
            const res = await request(server)   
            .delete("/api/workouts/exercises/1")
            .set("authorization", token)
            
            const exercise = await db('workouts_exercises').where({ id: 1 }).first();

            await expect(res.body.message).toBe("The exercise was successfully removed from the workout.");
            await expect(exercise).toBeUndefined();
        });
    });

});