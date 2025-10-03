const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/auth');

// POST /api/v1/pokemonDetails
router.post('/pokemonDetails', authenticateToken, async (req, res) => {
    try {
        const { pokemonName } = req.body;
        
        console.log('Buscando Pokémon:', pokemonName);

        // Validar que venga el nombre
        if (!pokemonName) {
        console.log('No se proporcionó nombre de Pokémon');
        return res.status(400).json({
            name: "",
            species: "",
            weight: "",
            img_url: ""
        });
        }

        // Hacer petición a PokeAPI
        console.log('Consultando PokeAPI...');
        const response = await fetch(`${process.env.API_URL}${pokemonName.toLowerCase()}`);
        
        // Verificar si el Pokémon existe
        if (!response.ok) {
            if (response.status === 404) {
                console.log('Pokémon no encontrado:', pokemonName);
                return res.status(400).json({
                name: "",
                species: "",
                weight: "",
                img_url: ""
                });
            }
            throw new Error(`Error en PokeAPI: ${response.status}`);
        }

        // Obtener datos del Pokémon
        const pokemonData = await response.json();
        console.log('Pokémon encontrado:', pokemonData.name);

        // Filtrar y formatear la respuesta
        const filteredData = {
            name: pokemonData.name,
            species: pokemonData.species.name,
            weight: pokemonData.weight.toString(),
            img_url: pokemonData.sprites.other['official-artwork']?.front_default || 
                    pokemonData.sprites.front_default
        };

        console.log('Enviando datos filtrados:', filteredData);
        
        // Responder al frontend
        res.status(200).json(filteredData);
        
    } catch (error) {
        console.error('Error interno:', error.message);
        res.status(500).json({ 
        error: 'Error interno del servidor',
        details: error.message 
        });
    }
});

module.exports = router;