const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../models/users-model");
const validateUser = require("./validateUser");
const generateToken = require("./generateToken");
const checkIfUserExists = require("../middleware/checkIfUserExists-middleware");

// POST - Register a user
router.post("/register", checkIfUserExists, (req, res) => {
    const user = req.body;
    const validationResult = validateUser(user, req.path);
    
    if (validationResult.isSuccessful) {
        const token = generateToken(user);
        const hashedPassword = bcrypt.hashSync(user.password, 12);
        user.password = hashedPassword;

        Users.add(user)
        .then(user => res.status(200).json({ user, token }))
        .catch(err => res.status(500).json({ error: "The server encountered an error while registering the user." }));
    } else {
        res.status(400).json({
            message: "Invalid credentials, please refer to errors",
            errors: validationResult.errors
        });
    };
});

// POST - Login a user
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const validationResult = validateUser(req.body, req.path);

    if (validationResult.isSuccessful) {
        Users.getByUsername(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: "Success! You are logged in!", token });                
            } else if (user) {
                res.status(400).json({ message: "Username and password do not match." });
            } else {
                res.status(400).json({ message: "A user with that username does not exist." });
            };
        })
        .catch(err => res.status(500).json({ error: "The server encountered an error while logging in." }));
    } else {
        res.status(400).json({
            message: "Invalid credentials, please refer to errors.",
            errors: validationResult.errors
        });
    };
});

module.exports = router;