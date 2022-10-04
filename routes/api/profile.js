const express = require('express');
const axios = require('axios')
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/User')

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
// @mdesc    Create or update Profile
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
            const {
                status, 
                skills, 
                company, 
                location,
                bio,
                website,
                githubusername,
                twitter,
                facebook,
                instagram,
                youtube,
                linkedin

            } = req.body;
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
            if(bio) {
                profileFields.bio = bio;
            }
            if(website) {
                profileFields.website = website;
            }
            if(githubusername) {
                profileFields.githubusername = githubusername;
            }

            // build socialFields
            const socialFields ={}
            if(twitter){
                socialFields.twitter = twitter
            }
            if(youtube){
                socialFields.youtube = youtube
            }
            if(linkedin){
                socialFields.linkedin = linkedin
            }
            if(facebook){
                socialFields.facebook = facebook
            }
            if(instagram){
                socialFields.instagram = instagram
            }
            profileFields.social = socialFields;

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


//  @route  DELETE /api/profile
// @mdesc    Delete Profile
// @access   private

router.delete('/', auth, async (req,res) => {

    try{
        // delete user posts
        await Post.deleteMany({user: req.user.id})
        // delete profile and user
        await Profile.findOneAndRemove({
            user: req.user.id
        });

        await User.findOneAndRemove({
            id: req.user.id
        })

        res.json({
            msg: 'User deleted'
        })

    }catch(err){
        res.status(500).json('Server Error')
    }
})


  // @route PUT api/profile/experience
// @desc Add Profile experience
// @access Private
router.put(
    '/experience',
    auth,
    body('title').notEmpty().withMessage('Title is required'),
    body('company').notEmpty().withMessage('Company is required'),
    body('from').notEmpty().withMessage('From date is required'),
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { title, company, location, from, to, current, description } =
        req.body;
      const newExp = { title, company, location, from, to, current, description };
      try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
  
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  

    // @route PUT api/profile/education
// @desc Add Profile education
// @access Private
router.put(
    '/education',
    auth,
    body('school').notEmpty().withMessage('School is required'),
    body('degree').notEmpty().withMessage('Degree is required'),
    body('fieldofstudy').notEmpty().withMessage('Fieldofstudy is required'),
    body('from').notEmpty().withMessage('From date is required'),
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { school, degree, fieldofstudy, from, to, current, description } =
        req.body;
      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      };
      try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
  
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );


    // @route DELETE api/profile/experience/:exp_id
// @desc DELETE experience from profile
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience = profile.experience.filter((item) => {
        return item.id != req.params.exp_id;
      });
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


    // @route DELETE api/profile/education/:edu_id
  // @desc DELETE education from profile
  // @access Private
  router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education = profile.education.filter((item) => {
        return item.id != req.params.edu_id;
      });
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });






// @route GET api/profile/github/:username
// @desc GET user repos from Github
// @access Public
router.get(`/github/:username`, async (req,res)=> {

    const uri = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`;
    try{
        const response = await axios.get(uri)
        res.json(response.data)
    }catch(err){
        console.log(err)
        res.json({msg: 'No github profile found'})
    }

})




module.exports = router;