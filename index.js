require('dotenv').config();

const express = require('express');
const { connect } = require('./config/database');
const movieRoute = require('./routes/movie'); 

const PORT = process.env.PORT

const app = express()

app.use('/movie', movieRoute);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});


