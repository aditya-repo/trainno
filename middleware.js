const dotenv = require('dotenv')
dotenv.config()

const AUTHKEY = process.env.AUTHKEY

// Middleware to check authentication key
const authenticate = (req, res, next) => {
    const authKey = req.header('Authorization');
  
    // Replace 'your-secret-key' with your actual authentication key
    if (authKey === AUTHKEY) {
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(401).json({ error: 'Unauthorized Access' });
    }
  };

module.exports = authenticate