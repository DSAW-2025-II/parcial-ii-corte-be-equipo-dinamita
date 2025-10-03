const jwt = require('jsonwebtoken');

// Middleware de autenticación
const authenticateToken = (req, res, next) => {    
    // Obtener el header de autorización
    const authHeader = req.headers['authorization'];

    // Extraer el token (Bearer TOKEN)
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ 
        error: 'User not authenticated',
        message: 'Se requiere token de autenticación'
        });
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
        return res.status(403).json({ 
            error: 'Invalid token',
            message: 'Token expirado o inválido'
        });
        }

        // Token válido - agregar info del usuario a la request
        req.user = user;
        
        // Continuar con la siguiente función (controller)
        next();
    });
};

module.exports = authenticateToken;