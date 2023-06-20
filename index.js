require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT

const app = express()

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handler
app.use((req, res) => {
	res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});


