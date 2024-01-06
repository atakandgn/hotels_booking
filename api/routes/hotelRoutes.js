const express = require('express');
const router = express.Router();
const {initializeSequelize} = require('../helpers/sequelize');
const Joi = require('joi');
const {Hotels} = require("../helpers/sequelizemodels");

router.get('/getHotels', async (req, res) => {
        try {
            const sequelize = await initializeSequelize();
            const hotelsModel = sequelize.define('Hotels', Hotels, {
                timestamps: false,
                tableName: 'hotels',
            });
            const hotels = await hotelsModel.findAndCountAll();

            const data = {
                hotels: hotels.rows,
                count: hotels.count,

            }
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e);
        }
    }
);

router.get('/getHotelDetail/:id', async (req, res) => {
        try {
            const hotelId = req.params.id;
            const {error, value} = Joi.object({
                hotelId: Joi.number().required(),
            }).validate(req.body);

            const sequelize = await initializeSequelize();
            const hotelsModel = sequelize.define('Hotels', Hotels, {
                timestamps: false,
                tableName: 'hotels',
            });
            const hotel = await hotelsModel.findOne({
                where: {
                    hotel_id: hotelId,
                }
            });

            res.status(200).send(hotel);
        } catch (e) {
            res.status(500).send(e);
        }
    }
);


module.exports = router;