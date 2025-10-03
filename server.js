require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const pokemonRoutes = require('./routes/pokemon');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', authRoutes);
app.use('/api/v1', pokemonRoutes);

app.listen(PORT, () => {
    console.log(`\nServer running on port ${process.env.PORT}`);
});