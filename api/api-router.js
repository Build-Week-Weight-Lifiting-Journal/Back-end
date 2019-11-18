const router = require("express").Router();

const restricted = require("../middleware/restricted-middleware");
const authRouter = require("../auth/auth-router");
const usersRouter = require("../routes/users-router");

router.use("/auth", authRouter);
router.use("/users", restricted, usersRouter);

module.exports = router;