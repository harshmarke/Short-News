const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
    res.send(`Hello World from the server router.js`);
})


router.get('/register', (req, res) => {
    res.send(`Welcome to the registration page`);
})

// using async
router.post('/register', async (req, res) => {

    const { name, email, phone, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "Plz fill the fields properly" });
    }
    // console.log("Reached here")
    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        }
        else {
            const user = new User({ name, email, phone, password, cpassword });

            await user.save();

            res.status(201).json({ message: "user registered successfully" });
        }



    } catch (err) {
        console.log(err);
    }

})


// Login route

router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        // validation for empty fields
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" });
        }

        // Find the user by email
        const userLogin = await User.findOne({ email: email });
        
        // If user is not found, return error
        if (!userLogin) {
            // console.log("User not found");
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // If user is found, compare passwords
        const isMatch = bcrypt.compareSync(password, userLogin.password);
        
        // If passwords don't match, return error
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate token and set cookie
        token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000), // cookies stored for 30 days
            httpOnly: true
        });

        // Return success message
        return res.json({ message: "User signed in successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});




module.exports = router;