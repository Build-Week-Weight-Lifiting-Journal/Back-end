const request = require("supertest");

const server = require("../api/server");
const db = require("../config/db-config");
const generateToken = require("../auth/generateToken");

describe("User Router Tests", () => {

    beforeEach(async () => {
        await db('users').truncate();
        await db('workouts').truncate();
        await db('users').insert({
            username: "testuser",
            email: "test@gmail.com",
            password: "testuser"
        })
    });
    
    describe("GET /users", () => {
        it("returns status code 200", async () => {
            
            const token = generateToken({ id: 1, username: "testuser" });
            
            const res = await request(server)   
                .get("/api/users")
                .set("authorization", token)
            
            await expect(res.status).toBe(200);
        });

        it("returns all users in database", async () => {
            const users = await db('users');

            await expect(users).toHaveLength(1);   
        });
    });

    describe("GET /users/getby/:id", () => {
        it("returns status code 200", async () => {
            const token = generateToken({ id: 1, username: "testuser" });
            
            const res = await request(server)   
                .get(`/api/users/getby/1`)
                .set("authorization", token)
            
            await expect(res.status).toBe(200);
        });

        it("returns user object with specified ID", async () => {
            const user = await db('users').where({ id: 1 }).first();
            
            await expect(user.username).toBe("testuser");
        });
    });

    describe("GET /users/getby/:username", () => {
        it("returns status code 200", async () => {
            const token = generateToken({ id: 1, username: "testuser" });
            
            const res = await request(server)   
                .get(`/api/users/getby/name/testuser`)
                .set("authorization", token)
            
            await expect(res.status).toBe(200);
        });

        it("returns user object with specified username", async () => {
            const user = await db('users').where({ username: "testuser" }).first();
            
            await expect(user.username).toBe("testuser");
            await expect(user.id).toBe(1);
        });
    });

    describe("GET /users/:id/workouts", () => {
        it("returns status code 200", async () => {
            const token = generateToken({ id: 1, username: "testuser" });
            await db('workouts').insert({ name: "Test Workout", user_id: 1 });
            
            const res = await request(server)   
                .get(`/api/users/1/workouts`)
                .set("authorization", token)
            
            await expect(res.status).toBe(200);
        });

        it("returns status code 400 if user does not have workouts", async () => {
            const token = generateToken({ id: 1, username: "testuser" });
            
            await db('workouts').truncate();

            const res = await request(server)   
                .get(`/api/users/1/workouts`)
                .set("authorization", token)
            
            await expect(res.status).toBe(400);
        });

        it("returns array of user's workouts", async () => {
            await db('workouts').insert({ name: "Test Workout", user_id: 1 });
            const workouts = await db('workouts').where({ user_id: 1 });
            
            await expect(workouts).toHaveLength(1);
            await expect(workouts[0].name).toBe("Test Workout");            
        });
    });

    describe("POST /users/:id/workouts", () => {
        it("returns status code 201", async () => {
            const token = generateToken({ id: 1, username: "testuser" });

            const res = await request(server)   
                .post(`/api/users/1/workouts`)
                .set("authorization", token)
                .send({
                    name: "An Intense Workout",
                    user_id: 1
                })
            
            await expect(res.status).toBe(201);
        });

        it("returns the ID of created workout", async () => {
            const token = generateToken({ id: 1, username: "testuser" });

            const res = await request(server)   
                .post(`/api/users/1/workouts`)
                .set("authorization", token)
                .send({
                    name: "New Workout",
                    user_id: 1
                })
            
            await expect(res.body[0]).toBe(1);
        });
    });
});