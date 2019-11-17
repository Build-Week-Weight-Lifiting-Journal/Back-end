const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets-config");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(403).json({ message: "That authentication token provided is invalid." })
            } else {
                req.decodedToken = decodedToken;
                next();
            };
        });
    } else {
        res.status(401).json({ message: "This endpoint requires an authentication token." })
    };
};