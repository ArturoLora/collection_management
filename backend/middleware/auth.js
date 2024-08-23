const jwt = require('jsonwebtoken');

// Authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Authorize admin role
function authorizeAdmin(req, res, next) {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    next();
}

module.exports = { authenticateToken, authorizeAdmin };
