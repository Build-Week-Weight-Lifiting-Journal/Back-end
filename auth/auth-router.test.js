const request = require("supertest");
const bcrypt = require("bcryptjs");

const server = require("../api/server");
const db = require("../config/db-config");
const validateUser = require("./validateUser");

describe("Auth Router Tests", () => {

    beforeEach(async () => {
        await db('users').truncate();
    });

    describe("POST /register", () => {
        it("returns 201 status code on successful registration and provides a jwt", async () => {
            const user = {
                username: "exampletest",
                email: "example@gmail.com",
                password: "exampletest"
            };

            await db('users').truncate();

            const res = await request(server)
                .post("/api/auth/register")
                .send(user)

            await expect(res.status).toBe(201);
            await expect(res.body.token).toBeDefined();
        });

        it("returns the created user from database", async () => {
            const user = {
                username: "example",
                email: "example@gmail.com",
                password: "example"
            }

            const [ id ] = await db('users')
                .insert(user);
            
            const newUser = await db('users').where({ id }).first();
            await expect(newUser.username).toBe("example");
            await expect(newUser.id).toBeDefined();
        });

        it("throws 400 error if username is less than 4 characters or if password is less than 8 characters", async () => {
            const user = {
                username: "tes",
                email: "test@gmail.com",
                password: "testtes"
            }

            const validationResult = validateUser(user);

            expect(validationResult.isSuccessful).toBeFalsy();
            expect(validationResult.errors[0]).toBe("A username must be 4 or more characters long.")
            expect(validationResult.errors[1]).toBe("A password must be 8 or more characters long.")
        });
    });

    describe("POST /login", () => {
        it("returns status 200 on successful login and provides a jwt", async () => {
            const user = {
                username: "exampletest",
                email: "example@gmail.com",
                password: "exampletest"
            }

            const hashedPassword = bcrypt.hashSync(user.password, 12);
            user.password = hashedPassword;

            await db('users').truncate();

            await db('users').insert(user);

            const res = await request(server)
                .post("/api/auth/login")
                .send({
                    username: "exampletest",
                    password: "exampletest"
                });
            await expect(res.status).toBe(200);
            await expect(res.body.token).toBeDefined();
        });

        it("returns status 400 when given wrong credentials", async () => {
            const user = {
                username: "example",
                email: "example@gmail.com",
                password: "example"
            }

            const hashedPassword = bcrypt.hashSync(user.password, 12);
            user.password = hashedPassword;

            await db('users').insert(user);

            const res = await request(server)
                .post("/api/auth/login")
                .send({
                    username: "example",
                    password: "examples"
                });
            await expect(res.status).toBe(400);
        });

        it("returns status 400 when given a username that doesn't exist", async () => {
            const user = {
                username: "example",
                email: "example@gmail.com",
                password: "example"
            }

            const hashedPassword = bcrypt.hashSync(user.password, 12);
            user.password = hashedPassword;

            await db('users').insert(user);

            const res = await request(server)
                .post("/api/auth/login")
                .send({
                    username: "testexample",
                    password: "example"
                });
            await expect(res.status).toBe(400);
        });
    });
});