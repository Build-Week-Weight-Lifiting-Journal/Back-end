const router = require("express").Router();

const Users = require("../models/users-model");
const validateUserId = require("../middleware/validateUserId-middleware");
const validateUsername = require("../middleware/validateUsername-middleware");

// GET - all users
router.get("/", async (req, res) => {
    try {
        const users = await Users.get();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "The server failed to retrieve all users." });
    };
});

// GET - individual user by ID
router.get("/:id", validateUserId, async (req, res) => {
    try { 
        res.status(200).json(req.userId); 
    } 
    catch (err) { 
        res.status(500).json({ error: "The server failed to retrieve that user." }); 
    };
});

// GET - individual user by username
router.get("/getby/:username", validateUsername, async (req, res) => {
    try { 
        res.status(200).json(req.user); 
    } 
    catch (err) { 
        console.log(err)
        res.status(500).json({ error: "The server failed to retrieve that user." }); 
    };
});

router.post('/:id/workouts', (req, res) => {
    const workoutData = req.body;
    const { id } = req.params;

    Users.getById(id)
    .then(workout => {
        Users.addWorkout(workoutData, id)
        .then(work => {
            res.status(201).json(work)
        }) 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The server failed to add a workout"})
    })
})

module.exports = router;