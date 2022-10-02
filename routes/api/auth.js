const express = require('express');
const auth = require('../../middleware/auth')

const User = require('../../models/User')

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

router.post('/', (req,res) => {
    res.json('login user')
})




module.exports = router;