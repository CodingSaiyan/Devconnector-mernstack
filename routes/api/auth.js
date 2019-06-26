const express = require("express"),
      router = express.Router(),
      auth = require("../../middleware/auth"),
      { check, validationResult } = require("express-validator/check"),
      config = require("config"),
      jwt = require("jsonwebtoken"),
      bcrypt = require('bcryptjs'),
      User = require("../../models/User");

      // @route GET api/auth
      // @desc  Test route
      // @access Public

    router.get("/", auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user)
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    })

      // @route GET api/auth
      // @desc  authenticate user & get token User
      // @access Public

      router.post("/", 
      [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            //see if user exists
            let user = await User.findOne({email});

            //if user exists send back errer
            if(!user){
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}] });
            }

            //check password matches
            const isMatched = await bcrypt.compare(password, user.password);

            if(!isMatched){
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}] });
            }
            
            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                {expiresIn: 360000 },
                (err, token) => {
                    if(err){
                        throw err;
                    } 
                       return res.json({ token });
                    
                })


        } catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }

        // res.send("Users route");

    });

    module.exports = router;