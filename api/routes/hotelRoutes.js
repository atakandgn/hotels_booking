const express = require("express");
const router = express.Router();
const { initializeSequelize, sequelize } = require("../helpers/sequelize");
const Joi = require("joi");
const { Hotels, Booking } = require("../helpers/sequelizemodels");
const { Op } = require("sequelize");

router.get("/getHotels", async (req, res) => {
  try {
    const sequelize = await initializeSequelize();
    const hotelsModel = sequelize.define("Hotels", Hotels, {
      timestamps: false,
      tableName: "hotels",
    });
    const hotels = await hotelsModel.findAndCountAll();

    const data = {
      hotels: hotels.rows,
      count: hotels.count,
    };
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/getHotelDetail/:id", async (req, res) => {
  try {
    const hotelId = req.params.id;
    const { error, value } = Joi.object({
      hotelId: Joi.number().required(),
    }).validate(req.body);

    const sequelize = await initializeSequelize();
    const hotelsModel = sequelize.define("Hotels", Hotels, {
      timestamps: false,
      tableName: "hotels",
    });
    const hotel = await hotelsModel.findOne({
      where: {
        hotel_id: hotelId,
      },
    });
    if (hotel && hotel.hotel_features) {
      hotel.hotel_features = hotel.hotel_features.split(",").map(Number);
    }
    if (hotel && hotel.hotel_images) {
      hotel.hotel_images = hotel.hotel_images.split(",");
    }

    res.status(200).send(hotel);
  } catch (e) {
    res.status(500).send(e);
  }
});

// i want to filter with country, startDate, endDate and travelersCount .
// check all hotels equal to country=country , start and end date between requested start and end date ,
// and travellersCount is  smaller than hotel_limit.

router.post("/getHotelsByFilter", async (req, res) => {
  try {
    const { error, value } = Joi.object({
      country: Joi.string().required(),
      startDate: Joi.string().optional(),
      endDate: Joi.string().optional(),
      travelersCount: Joi.number().optional(),
    }).validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { country, startDate, endDate, travelersCount } = value;
    const actualTravelersCount = travelersCount || 1;

    const sequelize = await initializeSequelize();

    const hotelsModel = sequelize.define("Hotels", Hotels, {
      timestamps: false,
      tableName: "hotels",
    });

    const bookingModel = sequelize.define("Booking", Booking, {
      timestamps: false,
      tableName: "booking",
    });

    let formattedStartDate = new Date(startDate);
    let formattedEndDate = new Date(endDate);

    const availableHotels = await hotelsModel.findAll({
      where: {
        hotel_country: country,
      },
    });

    // const checkConflict = async (hotel) => {

    //   console.log("oteldeki_rezervasyon", oteldeki_rezervasyon);
    //   return oteldeki_rezervasyon;
    // };

    let a = [];

    // Use `Promise.all` to wait for all async operations to complete
    await Promise.all(
      availableHotels.map(async (hotel) => {
        let alltravellers = 0;
        const oteldeki_rezervasyon = await bookingModel.findAll({
          where: {
            [Op.and]: [
              {
                [Op.or]: [
                  {
                    start_date: {
                      [Op.between]: [formattedStartDate, formattedEndDate],
                    },
                  },
                  {
                    [Op.and]: [
                      {
                        start_date: {
                          [Op.lte]: formattedStartDate,
                        },
                      },
                      {
                        end_date: {
                          [Op.gte]: formattedStartDate,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                hotel_id: hotel.hotel_id,
              },
            ],
          },
        });

        oteldeki_rezervasyon.map((rezervasyon) => {
          alltravellers += rezervasyon.travellers_count;
        });

        let hotel_limit = hotel.hotel_limit - alltravellers;

        if (hotel_limit > travelersCount) {
          a.push(hotel);
        }
      })
    );

    console.log("aaaa", a.map(hotelInstance => hotelInstance.dataValues.hotel_name));


    if (availableHotels.length === 0) {
      return res
        .status(200)
        .json({ message: "No available hotels for the specified criteria" });
    }
    // If no conflicts, return the available hotels and count
    res.status(200).json({ hotels: a, count: a.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
