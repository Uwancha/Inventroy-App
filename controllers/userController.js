const Admin = require('../models/admin');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')

exports.getsignUp = async (req, res, next) => {
    res.render("sign-up-form", 
        {title: "Register"}
    )
}

exports.getLogin  = async (req, res, next) => {
    res.render("login_form", {
        title: "Login"
    })
}

const hashedPassword = async(req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.hashedPassword = hashedPassword
        next()
    } catch (err) {
        next(err)
    }
}

exports.signUp = [
    body('username')
        .trim()
        .isLength({min:3, max:10})
        .escape()
        .withMessage('Username can be empty or less than 3 letters'),

    body('password')
        .trim()
        .isLength({min:8, max:16})
        .escape()
        .withMessage('Password must be between 8 and 16 charcters'),

    hashedPassword,

    async (req, res, next) => {
        try {
            const user = new Admin({
                username: req.body.username,
                password: req.hashedPassword,
                admin: true
            })

            
            const result = await user.save();
            res.redirect('/')
        } catch (err) {
             // Handle validation errors
             const errors = validationResult(req);
             res.render("sign-up-form", {
                 title: "Register",
                 errors: errors.array()
             });
        }
    } 
]