const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'})
    }

    try{
        // decode token 
        const jwtSecret = process.env.jwtSecret
        const decoded = jwt.verify(token, jwtSecret)
        
        req.user = decoded.user;
        next()

    }catch(err){
        console.log(err)
        return res.status(401).json({msg: 'Invalid token'})
    }

}

module.exports = auth;