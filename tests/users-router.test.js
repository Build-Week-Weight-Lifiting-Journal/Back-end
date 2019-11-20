const request = require("supertest");
const bcrypt = require("bcryptjs");

const server = require("../api/server");
const db = require("../config/db-config");
const generateToken = require("../auth/generateToken");

describe("User Router Tests", () => {

    beforeEach(async () => {
        await db('users').truncate();
        await db('users').insert({
            username: "testtest",
            email: "test@gmail.com",
            password: "testtest"
        })
        await db('users').insert({
            username: "newuser",
            email: "newuser@gmail.com",
            password: "newuser"
        })
        await db('workouts').insert({ name: "Test Workout", user_id: 1 });
        await db('workouts').insert({ name: "New Workout", user_id: 1 });
    });
    
    describe("GET /users", () => {
        it("returns status code 200", async () => {
            const token = generateToken({ id: 1, username: "testtest" });
            
            const res = await request(server)   
                .get("/api/users")
                .set("authorization", token)
            
            await expect(res.status).toBe(200);
        });

        it("returns all users in database", async () => {
            const users = await db('users');

            await expect(users).toHaveLength(2);   
        });
    });

    describe("GET /users/getby/:id", () => {
        it("returns status code 200", async () => {
            const token = generateToken({ id: 1, username: "testtest" });
            
            const res = await request(server)   
                .get(`/api/users/getby/1`)
                .set("authorization", token)
            
            await expect(res.status).toBe(200);
        });

        it("returns user object with specified ID", async () => {
            const user = await db('users').where({ id: 1 }).first();
            const user2 = await db('users').where({ id: 2 }).first();
            
            await expect(user.username).toBe("testtest");
            
            await expect(user2.username).toBe("newuser");
        });
    });

    describe("GET /users/getby/:username", () => {
        it("returns status code 200", async () => {
            const token = generateToken({ id: 1, username: "testtest" });
            
            const res = await request(server)   
                .get(`/api/users/getby/name/testtest`)
                .set("authorization", token)
            
            await expect(res.status).toBe(200);
        });

        it("returns user object with specified username", async () => {
            const user = await db('users').where({ username: "testtest" }).first();
            const user2 = await db('users').where({ username: "newuser" }).first();
            
            await expect(user.username).toBe("testtest");
            await expect(user.id).toBe(1);
            await expect(user2.username).toBe("newuser");
            await expect(user2.id).toBe(2);
            
        });
    });

    describe("GET /users/:id/workouts", () => {
        it("returns status code 200", async () => {
            const token = generateToken({ id: 1, username: "testtest" });
            
            const res = await request(server)   
                .get(`/api/users/1/workouts`)
                .set("authorization", token)
            
            await expect(res.status).toBe(200);
        });

        it("returns array of user's workouts", async () => {
            const workouts = await db('workouts').where({ user_id: 1 });
            
            await expect(workouts).toHaveLength(2);
            await expect(workouts[0].name).toBe("Test Workout");            
            await expect(workouts[1].name).toBe("New Workout");
        });
    });

});