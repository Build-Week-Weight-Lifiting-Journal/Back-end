const request = require("supertest");

const generateToken = require('../auth/generateToken');
const server = require('../api/server');
const db = require('../config/db-config');

describe('Workout-router tests', () => {
    
    beforeEach(async () => {
        await db('workouts').truncate()
        await db('workouts').insert({name: 'stronk', user_id: 1});
    });

    describe('GET /, all workouts', () => {
        it('returns a status code 401 without a token', async () => {
            const token = generateToken({id: 1, username: 'testtest'})
            const res = await request(server)
                .get('/api/workouts')
                .set('authorization', token)
            
            await expect(res.status).toBe(200)
            await expect(res.type).toMatch(/json/i)
        });
    });
    describe('GET /:id, workout by id', () => {
        it('returns the selected object', async () => {
            const token = generateToken({id: 1, username: 'testtest'})
            const res = await request(server)
                .get('/api/workouts/1')
                .set('authorization', token)
          
            await expect(res.body.workout_id).toBe(1)
        });
    });
    describe('DELETE /:id, workout by id', () => {
        it('removes the workout by id', async () => {
            const token = generateToken({id: 1, username: 'testtest'})
            await request(server)
                .delete('/api/workouts/1')
                .set('authorization', token)
            
            const res = await request(server)
                .get('/api/workouts/1')
                .set('authorization', token)
            await expect(res.body.workout_id).toBeUndefined()
        })
    });

    describe('PUT /:id, workout by id', () => {
        it('updates the workout by id', async () => {
            const token = generateToken({id: 1, username: 'testtest'})
            await request(server)
                .put('/api/workouts/1')
                .send({name: "stronker", user_id: 1})
                .set('authorization', token)
            const res = await request(server)
                .get('/api/workouts/1')
                .set('authorization', token)
            
            await expect(res.body.workout_name).toBe("stronker")
        });
    });

    describe('POST /:id/exercises, adds exercise to workout', () => {
        it('adds an exercise to the workout by id', async () => {
            const token = generateToken({id: 1, username: 'testtest'})
            const exercise = {
                name: 'squats',
                region: 'quads',
                reps: 10,
                sets: 3
            }
            await request(server)
                .post('/api/workouts/1/exercises')
                .send(exercise)
                .set('authorization', token)
            
            const res = await request(server)
                .get('/api/workouts/1')
                .set('authorization', token)
            
            await expect(res.body.exercises).toHaveLength(1)
        })
        it('adds the given exercise to the workout by id', async () => {
            const token = generateToken({id: 1, username: 'testtest'})
            const exercise = {
                name: 'squats',
                region: 'quads',
                reps: 10,
                sets: 3
            }
            await request(server)
                .post('/api/workouts/1/exercises')
                .send(exercise)
                .set('authorization', token)
            
            const res = await request(server)
                .get('/api/workouts/1')
                .set('authorization', token)
            
            await expect(res.body.exercises[0].exercise_name).toBe('squats')

        })
    })
})

