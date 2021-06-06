const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');
const middleware = require('../middleware/middleware');


router.get('/', async(req, res) => {
    const users = await Users.getAll();
    res.json(users);
});

router.post('/register', async (req, res) => {
    console.log(req.body);
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await Users.insert(req.body);
    res.json(result);
});

router.post('/login', async (req, res) => {
    const user = await Users.getByEmail(req.body.correo)
    if(user === undefined) {
        res.json({
            error: 'Error, correo o contraseña incorrectos.'
        })
    } else {
        const equals = bcrypt.compareSync(req.body.password, user.password);
        if(!equals) {
            res.json({
                error: 'Error, correo o contraseña incorrectos.'
            });
        } else {
            
            res.json({
                succesfull: createToken(user),
                done: 'Login correct.'
            });
        }
    }
})

router.use(middleware.checkToken);

router.get('/mainUser', (req, res) => {
    console.log(req.userId);
    Users.getById(req.userId)
    .then(rows =>{
        res.json(rows);
    })
    .catch(err => console.log(err));
});

const createToken = (user) => {
    let payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, require('../config').secret)
}

module.exports = router;