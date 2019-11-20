const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets-config");
const Users = require("../models/users-model");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(403).json({ message: "That authentication token provided is invalid." })
            } else {
                Users.getById(decodedToken.id)
                .then(user => {
                    if (user){
                        req.decodedToken = decodedToken;
                        req.userObj = user;
                        next();
                    }
                })
                .catch(err => res.status(500).json({ error: "The server failed to find that user." }));
            };
        });
    } else {
        res.status(401).json({ message: "This endpoint requires an authentication token." })
    };
};