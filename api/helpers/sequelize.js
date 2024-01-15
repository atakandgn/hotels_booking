// helpers/sequelize.js POSTGRESQL
const { Sequelize } = require("sequelize");

let sequelize = null;

const initializeSequelize = async () => {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Disable SSL validation (use only in development/testing)
            },
        },
    });

    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }

    return sequelize;
};

module.exports = {
    sequelize,
    initializeSequelize,
};


// // helpers/sequelize.js MYSQL
// const { Sequelize } = require("sequelize");
//
// let sequelize = null;
//
// const initializeSequelize = async () => {
//     sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//         host: process.env.DB_HOST,
//         dialect: "mysql",
//     });
//
//     try {
//         await sequelize.authenticate();
//         console.log("Connection has been established successfully.");
//     } catch (error) {
//         console.error("Unable to connect to the database:", error);
//     }
//
//     return sequelize;
// };
//
// module.exports = {
//     sequelize,
//     initializeSequelize,
// };


