module.exports = (user, path) => {
    const errors = [];

    if (!user.username || user.username.length < 4) {
        errors.push('A username must be 4 or more characters long.')
    }

    if (!user.password || user.password.length < 8) {
        errors.push('A password must be 8 or more characters long.')
    }

    return {
        isSuccessful: !Boolean(errors.length),
        errors
    }
};