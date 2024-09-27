const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = require('../models/courseModel');

require('dotenv').config();
const User = model.User;
const JWT_SECRET = process.env.JWT_SECRET;

exports.signUp = async (req, res) => {
    const {userName, userRollNumber, userEmail, userPassword} = req.body;
    try {
        // hash password
        const hashPassword = await bcrypt.hash(userPassword,10) ;
        
        const  newUser = new User({
            userName,
            userRollNumber,
            userEmail,
            userPassword:hashPassword,
        })
        await newUser.save();
        res.status(201).send("User Created");
    } catch (error) {
        res.status(500).send("Error Creating User");
    }
}


exports.signIn = async (req,res) => {
    const {userEmail, userPassword} = req.body;

    try {
        
        const user = await User.findOne({userEmail});
        if(!user) res.status(400).send("User not exist");
    
        const isMatch = await bcrypt.compare(userPassword,user.userPassword);
        if(!isMatch) res.status(400).send("Wrong Password")
    
        // create a JWT token
        const token = jwt.sign({userEmail: userEmail},JWT_SECRET,{expiresIn:'30d'})

        // sets the token in cookie
        res.cookie('courseToken',token,{
            httpOnly: true,
            secure: true,    
            sameSite: 'None'
        })
    
        res.status(200).json({"message":"sigin successfull","token":token});

    } catch (error) {
        console.log(error);
        res.status(500).send("Error in signin")
    }   

}

exports.logOut = async (req, res) => {
    console.log(req.cookies[0]);
    res.clearCookie('courseToken', {domain: '127.0.0.1', path : '/'});
    console.log("cookie removed");
    res.send('cookie removed');
    // res.redirect('/');
}