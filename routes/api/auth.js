const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const auth = require('../../middleware/auth')

const router = express.Router()


//  @mroutes  GET /api/auth
// @mdesc    Load User
// @access   private
router.get('/', auth, async (req,res) => {
    // return user from decoded token
    try{

        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        res.status(500).json('Server Error')
    }
    
   
} )



//  @mroutes  POST /api/auth
// @mdesc    Login user 
// @access   public

router.post('/', 
    body('email').isEmail().withMessage('provide valid email'), 
    body('password').notEmpty().withMessage('provide password'),
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    // validate fields
    // find user by email
    // if user exists then compare passwords
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg: 'Invalid credential'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                msg: 'Invalid credential'
            })
        }
        // return jsonwebtoken
        const jwtSecret = process.env.jwtSecret;
        const payload = {user: {id: user.id}}
        jwt.sign(payload, jwtSecret,{expiresIn: '24h'}, (err, token) => {
            if(err) throw err;
            res.status(200).json({token})
        })

    }catch(err){
        res.status(500).json('Server Error')
    }
    


})




module.exports = router;