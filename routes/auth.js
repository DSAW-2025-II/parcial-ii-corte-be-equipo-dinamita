const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Endpoint de Login
router.post('/auth', (req, res) => {  
  const { email, password } = req.body;
  
  if (email === process.env.VALID_EMAIL && password === process.env.VALID_PASSWORD) {
    
    const payload = {
      email: email,
      timestamp: new Date().toISOString(),
      role: 'admin'
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Token created');
    
    return res.status(200).json({ 
      token: token
    });
  }

  res.status(400).json({ 
    error: 'invalid credentials' 
  });
});

module.exports = router;