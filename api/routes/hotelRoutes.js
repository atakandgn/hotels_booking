const express = require('express');
const router = express.Router();
const {initializeSequelize, sequelize} = require('../helpers/sequelize');
const Joi = require('joi');
const {Hotels, Booking} = require("../helpers/sequelizemodels");
const {Op} = require("sequelize");

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
            if (hotel && hotel.hotel_features) {
                hotel.hotel_features = hotel.hotel_features.split(',').map(Number);
            }
            if (hotel && hotel.hotel_images) {
                hotel.hotel_images = hotel.hotel_images.split(',');
            }


            res.status(200).send(hotel);
        } catch (e) {
            res.status(500).send(e);
        }
    }
);

router.post('/getHotelsByFilter', async (req, res) => {
    try {
        const { error, value } = Joi.object({
            country: Joi.string().required(),
            startDate: Joi.date().optional(),
            endDate: Joi.date().optional(),
            travelersCount: Joi.number().optional(),
        }).validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { country, startDate, endDate, travelersCount } = value;

        // Set default value for travelersCount if not provided
        const actualTravelersCount = travelersCount || 1;

        const sequelize = await initializeSequelize();

        const hotelsModel = sequelize.define('Hotels', Hotels, {
            timestamps: false,
            tableName: 'hotels',
        });

        const bookingModel = sequelize.define('Booking', Booking, {
            timestamps: false,
            tableName: 'booking',
        });

        // Check if there are available hotels that meet the criteria
        const { count, rows: availableHotels } = await hotelsModel.findAndCountAll({
            where: {
                hotel_country: country,
                hotel_limit: {
                    [Op.gte]: actualTravelersCount,
                },
            },
        });

        if (count === 0) {
            return res.status(200).json({ message: 'No available hotels for the specified criteria' });
        }

        // Check if there are bookings that overlap with the specified date range
        const conflictingBookings = await bookingModel.findAll({
            where: {
                [Op.and]: [
                    {
                        start_date: {
                            [Op.lte]: endDate,
                        },
                    },
                    {
                        end_date: {
                            [Op.gte]: startDate,
                        },
                    },
                ],
            },
        });

        if (conflictingBookings.length > 0) {
            return res.status(200).json({ message: 'Hotels are not available for the specified date range' });
        }

        const hotelsWithConvertedFeatures = availableHotels.map((hotel) => {
            if (hotel.hotel_features) {
                hotel.hotel_features = hotel.hotel_features.split(',').map(Number);
            }
            return hotel;
        });

        // If no conflicts, return the available hotels and count
        res.status(200).json({ count, hotels: hotelsWithConvertedFeatures });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;