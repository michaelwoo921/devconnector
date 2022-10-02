const express = require('express');
const router = express.Router()


//  @mroutes  POST /api/auth
// @mdesc    Load user 
// @access   private

router.post('/', (req,res) => {
    res.json('register user')
})




module.exports = router;