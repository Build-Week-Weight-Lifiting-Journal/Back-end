const request = require("supertest");

const generateToken = require('../auth/generateToken');
const server = require('../api/server');
const db = require('../config/db-config');

describe('Workout-router tests', () => {

    beforeEach(async () => {
        await db('workouts').truncate();
        // await db('users').truncate();
    });
   
    describe('GET /, all workouts', () => {
        it('returns a status code 200 with a token', async () => {
            const token = generateToken({id: 1, username: 'testtest'})
            const res = await request(server)
                .get('/api/workouts')
                .set('authorization', token)
            
            await expect(res.status).toBe(200)
            await expect(res.type).toMatch(/json/i)
        });
    });
    describe('Get /:id, workout by id', () => {
        it('returns the selected object', async () => {
            const token = generateToken({id: 1, username: 'testtest'})
            await db('workouts').insert({name: 'stronk', user_id: 1});
            const res = await request(server)
            .get('/api/workouts/1')
            .set('authorization', token)
            
            await expect(res.body.workout_id).toBe(1)
        })
    })
})

