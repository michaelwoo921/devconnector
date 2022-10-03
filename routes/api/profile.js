const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')

const router = express.Router()






//  @route  GET /api/profile
// @mdesc    GET all profiles 
// @access   public

router.get('/', 
    async (req,res) => { 
        try{
            const profiles = await Profile.find({}).populate('user', ['name', 'avatar']);
            res.json(profiles);
        }catch(err){
            res.status(500).json('Server Error');
        }
})

//  @route  GET /api/profile/me
// @mdesc    GET auth user profile 
// @access   private

router.get('/me', 
    auth,
    async (req,res) => { 
        try{
            const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])
            if(!profile){
                return res.status(400).json({
                    msg: 'No profile found'
                })
            }
            return res.json(profile);
        }catch(err){
            console.log(err)
            res.status(500).json('Server Error');
        }
})


//  @route  GET /api/profile/user/:user_id
// @mdesc    GET  profile by user_id
// @access   public

router.get('/user/:user_id', 
    async (req,res) => { 
        try{
            const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
            if(!profile){
                return res.status(400).json({
                    msg: 'No profile found by that user'
                })
            }
            return res.json(profile);
        }catch(err){
            if(err.kind === 'ObjectId'){
                return res.status(400).json({
                    msg: 'No profile found'
                })
            }
            res.status(500).json('Server Error');
        }
})




//  @route  POST /api/profile
// @mdesc    Create or update Prfofile
// @access   private

router.post('/', 
    auth,
    body('skills').notEmpty().withMessage('Skills is required'),
    body('status').notEmpty().withMessage('Status is required'),
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        try{
            const {status, skills, company, location} = req.body;
            // build profile
            const profileFields = {}
            profileFields.user = req.user.id;
            if(status) {
                profileFields.status = status;
            }
            if(company) {
                profileFields.company = company;
            }
            if(location) {
                profileFields.location = location;
            }
            if(skills) {
                profileFields.skills = skills.split(',').map(skill => skill.trim());
            }


            // create user profile  if user profile doesn't exist
           let profile =  await Profile.findOne({user: req.user.id})
            if(!profile){
                profile =  new Profile(profileFields)
                await profile.save();
                return res.json(profile)
            }
            // update user profile
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id}, 
                {$set: profileFields},
                {new: true}
            );
            return res.json(profile)
        }catch(err){
            res.status(500).json('Server Error');
        }
})







module.exports = router;