//on récupère un jwt pour vérifier les tokens//
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);

        const isAdmin = decodedToken.isAdmin;

        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';

        } else {
            req.userId = userId
            req.isAdmin = isAdmin
            next();
        }
    } catch (error) {
        console.log("erreur auth", error)

        res.status(401).json({
            error: "Unauthorized"
        });
    }
};