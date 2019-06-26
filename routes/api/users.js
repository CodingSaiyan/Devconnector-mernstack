const express = require("express"),
      router = express.Router(),
      { check, validationResult } = require("express-validator/check"),
      jwt = require("jsonwebtoken"),
      config = require("config"),
      User = require("../../models/User"),
      gravatar = require("gravatar"),
      bcrypt = require("bcryptjs");

      // @route GET api/users
      // @desc  Register User
      // @access Public

    router.post("/", [
        check("name", "Name is required")
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            //see if user exists
            let user = await User.findOne({email});

            //if user exists send back errer
            if(user){
                return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
            }

            //get users gravatar
            const avatar = gravatar.url(email, {
                s: '200', //size
                r: 'pg', // rating
                d: 'mm' // default
            })

            user = new User({
                name,
                email,
                avatar,
                password
            })

            //encrypt password 
            // genSalt creates a promise so use await and recommended rounds is 10
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // This saves to DATABASE
            await user.save();
            
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