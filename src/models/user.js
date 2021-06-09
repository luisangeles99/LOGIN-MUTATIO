const db = require('../db/connect');


const insert = ({ nombre, apellido, correo, password, casa}) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM USER WHERE CORREO = ?', [correo], (err, results) => {
            if(err) reject(new Error(err.message))
            if(results.length != 0) reject(new Error('Usuario con correo ' + correo + ' ya registrado.')); 
        });
        db.query('INSERT INTO USER (nombre, apellido, correo, password, casa) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, correo, password, casa], (err, 
            result) => {
                if(err){
                    reject(new Error(err.message))
                } 
                if(result) {
                    resolve(result)
                };
            });
    })
};



const getByEmail = (correo) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM USER WHERE CORREO = ?', [correo], (err, rows) => {
            if(err) reject(new Error(err.message))
            else{
                resolve(rows[0])
            }   
        });
    });
};

const getById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM USER WHERE ID = ?', [id], (err, rows) => {
            if(err) reject(new Error(err.message))
            resolve(rows[0])
        });
    });
};


const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM USER', (err, rows) => {
            if (err) reject(err)
            resolve(rows);
        });
    });
};


module.exports = {
    getAll: getAll,
    insert: insert,
    getByEmail: getByEmail,
    getById : getById
}