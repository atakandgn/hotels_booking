// helpers/sequelizemodels.js
const {DataTypes} = require('sequelize');

const Users = {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coupon_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}

const Hotels = {
    hotel_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    hotel_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hotel_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hotel_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hotel_country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hotel_features: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hotel_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hotel_comments: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hotel_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hotel_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hotel_latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    hotel_longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    hotel_images: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    hotel_discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}

const Booking = {
    booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Hotels,
            key: 'hotel_id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'user_id',
        },
    },
    start_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    travellers_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

}

const Coupons = {
    coupon_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: Users,
            key: 'coupon_id',
        },
    },
    coupon_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coupon_discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    coupon_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    coupon_start_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coupon_end_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

module.exports = {
    Users,
    Hotels,
    Booking,
    Coupons,
};
