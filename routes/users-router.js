const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("../models/users-model");
const { jwtSecret } = require("../config/secrets-config");
const Workouts = require("../models/workouts-model");
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
router.get("/getby/:id", validateUserId, async (req, res) => {
    try { 
        res.status(200).json(req.userId); 
    } 
    catch (err) { 
        res.status(500).json({ error: "The server failed to retrieve that user." }); 
    };
});

// GET - individual user by username
router.get("/getby/name/:username", validateUsername, async (req, res) => {
    try { 
        res.status(200).json(req.user); 
    } 
    catch (err) { 
        console.log(err)
        res.status(500).json({ error: "The server failed to retrieve that user." }); 
    };
});

// GET - all workouts for a user
router.get("/:id/workouts", (req, res) => {
    Workouts.findUserWorkouts(req.params.id)
    .then(workouts => {
        if (workouts.length) {
            res.status(200).json(workouts)
        } else {
            res.status(400).json({ message: "This user does not have any workouts." })
        }
    })
    .catch(err => res.status(500).json({ error: "There was an issue while retrieving user's workouts." }));
});

// THIS DOES NOT MAKE SENSE
// GET - a single workout for a user
// router.get("/workouts/:id", (req, res) => {
//     Workouts.findUserWorkoutById(req.params.user_id, req.params.id)
//     .then(workout => res.status(200).json(workout))
//     .catch(err => res.status(500).json({ error: "There was an issue while retrieving user's workouts." }));
// });

// POST - Add a workout to a user
router.post('/:id/workouts', validateUserId, (req, res) => {
    const workoutData = req.body;
    const { id } = req.params;

    if (!workoutData.name) {
        res.status(400).json({ message: "Please provide a name for this workout." });
    }

    Users.addWorkout({ 
        ...workoutData,
        user_id: id
    })
    .then(work => res.status(201).json(work)) 
    .catch(err => res.status(500).json({ error: "The server failed to add a workout." }));
})

// GET - current user profile 
router.get("/profile", (req, res) => {
    const user = req.userObj;

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: "There is currently not a user being used. Please ensure you have signed in and are using a JWT to keep track of the current user being used." })
    }
});

module.exports = router;