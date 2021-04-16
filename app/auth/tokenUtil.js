const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;

exports.generateAccessToken = (user_uuid) => {
    return jwt.sign(user_uuid, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}

exports.createToken = (req, res) => {
    // ...
    const token = this.generateAccessToken({ user_uuid: req.body.user_uuid });
    res.send(token);
    // ...
};

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[0]
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3V1aWQiOiIyMGZmNjY3My1iZDM4LTRmMTItOTQ0OC01ODY0ODhmMzNhMWQiLCJpYXQiOjE2MTc3ODAxNDIsImV4cCI6MTYxNzc4MDIwMn0.HxvRSCZzZ54ByPIzpKRPBINYpr3YlzplYqIxjmI-KrQ';
    // res.setHeaders
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        req.authData = data
        next()
    })
}

exports.test = (req, res) => {
    const data = req.authData;
    res.json(data);
    res.end();
}