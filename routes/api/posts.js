const express = require('express');
const router = express.Router()


//  @method  POST /api/user
// @mdesc    Register User 
// @access   public

router.post('/', (req,res) => {
    res.json('register user')
})




module.exports = router;