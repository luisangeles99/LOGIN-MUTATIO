const validator = require('../helpers/validate');

const register = (req, res, next) => {
    const validationRule =  {
        "nombre":"required|string",
        "apellido":"required|string",
        "correo":"required|email",
        "password":"required|string",
        "casa":"required|min:1|max:1000|integer"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const login = (req, res, next) => {
    const validationRule =  {
        "correo":"required|email",
        "password":"required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}


module.exports = {
    register: register,
    login: login
}