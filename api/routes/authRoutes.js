// authRoutes.js
const express = require('express');
const router = express.Router();
const {initializeSequelize} = require('../helpers/sequelize');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Users, Coupons} = require("../helpers/sequelizemodels");

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;

        const sequelize = await initializeSequelize();
        const usersModel = sequelize.define('Users', Users, {
            timestamps: false,
            freezeTableName: true,
        });
        const couponsModel = sequelize.define('Coupons', Coupons, {
            timestamps: false,
            freezeTableName: true,
        });

        // Correct the association alias
        usersModel.belongsTo(couponsModel, {foreignKey: 'coupon_id', targetKey: 'coupon_id', as: 'coupon'});

        // Check if the user exists
        const findUser = await usersModel.findOne({
            where: {
                username,
            },
            include: [
                {
                    model: couponsModel,
                    as: 'coupon',
                    attributes: ['coupon_discount'],
                },
            ],
        });

        if (!findUser) {
            return res.status(401).send('Invalid username or password');
        }
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, findUser.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid username or password');
        }

        // Generate JWT token
        const tokenPayload = {
            user_id: findUser.user_id,
            username: findUser.username,
            email: findUser.email,
            name: findUser.name,
            surname: findUser.surname,
            gender: findUser.gender,
            phone: findUser.phone,
            coupon_rate: findUser.coupon ? findUser.coupon.coupon_discount : 5,
            picture: findUser.gender === 1 ? "https://cdn-icons-png.flaticon.com/512/219/219969.png" : "https://cdn-icons-png.flaticon.com/512/4140/4140052.png",
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY);

        // Send the token in the response
        return res.status(200).json({token});
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal server error during login.');
    }
});

router.post('/register', async (req, res) => {
    try {
        const {error, value} = Joi.object({
            name: Joi.string().required(),
            surname: Joi.string().required(),
            email: Joi.string().email().required(),
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().min(8).required(),
            passwordConfirm: Joi.string().valid(Joi.ref('password')).required(),
            phone: Joi.string().required(),
            gender: Joi.number().integer().min(1).max(2).required(), // 1=XX, 2=XY
            country: Joi.string().required(),
            city: Joi.string().required(),
            district: Joi.string().required(),
            coupon_code: Joi.string().optional().default("DEFAULT"),

        }).validate(req.body);

        if (error) {
            return res.status(400).send(`Validation Error: ${error.details[0].message}`);
        }

        const {name, surname, email, username, password, phone, gender, country, city, district, coupon_code} = value;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const sequelize = await initializeSequelize();
        const usersModel = sequelize.define('Users', Users, {
            timestamps: false,
            freezeTableName: true,
        });
        const couponsModel = sequelize.define('Coupons', Coupons, {
            timestamps: false,
            freezeTableName: true,
        });
        let coupon = await couponsModel.findOne({
            where: {
                coupon_code: coupon_code,
            },
        });
        if (!coupon) {
            coupon = await couponsModel.findOne({
                where: {
                    coupon_code: "DEFAULT",
                },
            });
        }

        // Create a new user
        const newUser = await usersModel.create({
            name,
            surname,
            email,
            username,
            password: hashedPassword,
            phone,
            gender,
            country,
            city,
            district: district ? district : "-",
            coupon_id: coupon ? coupon.coupon_id : 1,
        });

        if (!newUser) {
            return res.status(500).send('Registration error occurred. Please try again.');
        }

        return res.status(200).send('Account created successfully.');
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal server error during registration.');
    }
});


router.post('/googleAuth', async (req, res) => {
    try {
        const { error, value } = Joi.object({
            name: Joi.string().required(),
            picture: Joi.string().optional(),
            coupon_rate: Joi.number().integer().min(1).max(100).required(),
        }).validate(req.body);
        const {name, coupon_rate,picture} = value;
        if (error) {
            return res.status(400).send(`Validation Error: ${error.details[0].message}`);
        }

        const tokenPayload = {
            name: name,
            coupon_rate: coupon_rate,
            picture:picture
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY);
        return res.status(200).json({token});

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal server error during login.');
    }
});


module.exports = router;