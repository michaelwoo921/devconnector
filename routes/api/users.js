const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../../models/User')


const router = express.Router()


//  @routes  POST /api/users
// @mdesc    Register User 
// @access   public

router.post('/', 
    body('name').notEmpty().withMessage('name is required'), 
    body('email').isEmail().withMessage('provide valid email'), 
    body('password').isLength({min: 6}).withMessage('password must be at least 6 characters'),  

    async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{ 
        // validate user
        // encrypt password
        // save user to database
        let {name, email, password} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                errors: [ { msg: 'User already exists' }]
            })
        }

        const salt = await bcrypt.genSalt(10);
        user = new User({name, email, password});
        user.password = await bcrypt.hash(password, salt)
        await user.save();

        // return jsonwebtoken
        const payload = {user: {id: user.id}}
        const jwtSecret = process.env.jwtSecret
        jwt.sign(payload, jwtSecret,{
            expiresIn: '24h'
        }, (err, token) => {
            if(err) throw err;
            res.json({token})
        })

    }catch(err){
        res.status(500).json('Server Error')
    }

})




module.exports = router;