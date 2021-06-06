
const cors = require('cors');
const express = require('express');

const router = require('./routes/users');



require('dotenv').config();
require('./db/connect')

const app = express();
const port = process.env.PORT || 3001

app.use(express.json());
app.use(router);
app.use(cors());

app.listen(port, function(){
    console.log("Listening in port " + port );
    
});