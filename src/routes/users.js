const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');
const middleware = require('../middleware/middleware');
const validation = require('../middleware/validation-middleware');


router.get('/', async(req, res) => {
    const users = await Users.getAll();
    res.json(users);
});


router.post('/register', validation.register , (req, res) => {
    console.log('Correo para registro: ' + req.body.correo);
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    Users.insert(req.body).then(function(){
        res.send({
            success: 'Usuario creado con éxito ' + req.body.correo
        })
    }).catch(function(err){
        res.status(400).send({
            Error: 'Usuario no se ha registrado',
            Tipo: err.message
        });
    })
});

router.post('/login', validation.login ,async (req, res) => {
    const user = await Users.getByEmail(req.body.correo)
    if(user === undefined) {
        res.status(404).send({
            error: 'Error, correo o contraseña incorrectos.'
        })
    } else {
        const equals = bcrypt.compareSync(req.body.password, user.password);
        if(!equals) {
            res.status(404).send({
                error: 'Error, correo o contraseña incorrectos.'
            });
        } else {
            var token = createToken(user)
            res.send({
                succesfull: true,
                token: token,
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