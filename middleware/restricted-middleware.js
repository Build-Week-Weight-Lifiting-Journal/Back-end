const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets-config");
const Users = require("../models/users-model");

// If a token is provided, and it's NOT valid, throw an error
// If a token is provided, and it's valid, grant access
// Save the decodedToken and the User object, on the 
// request body as req.decodedToken and req.userObj
module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    
    if (token) {
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            try {
                if (err) {
                    res.status(403).json({ message: "That authentication token provided is invalid." })
                } else {
                    const user = await Users.getById(decodedToken.id);
                    if (user){
                        req.decodedToken = decodedToken;
                        req.userObj = user;
                        next();
                    }
                } 
            } catch (err) {
                res.status(500).json({ error: "The server failed to find that user." });
            
            };
        });
    } else {
        res.status(401).json({ message: "This endpoint requires an authentication token." })
    };
};