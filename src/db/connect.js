const mysql = require('mysql');


const pool = mysql.createPool({
    host: require('../config').DB_HOST,
    user: require('../config').DB_USER,
    password: require('../config').DB_PASS,
    port: require('../config').DB_PORT,
    database: require('../config').DB_NAME
});


module.exports = pool;