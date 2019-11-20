const db = require('../config/db-config.js');

const { edit } = require("../models/workouts-model");

describe("workouts-model", () => {
    describe("edit", () => {
        beforeEach(async () => {
            await db('workouts').truncate();
            await db('workouts').insert({
                name: 'stronk',
                user_id: 1
            })
        })

        it("should edit a workout", async () => {
            const changes = {name: 'stronker', user_id: 1}
            await edit(changes, 1)

            const workouts = await db("workouts")
            expect(workouts[0].name).toBe('stronker')
        })
    })
})