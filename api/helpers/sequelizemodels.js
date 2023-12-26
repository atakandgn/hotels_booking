// helpers/sequelizemodels.js
const {DataTypes} = require('sequelize');

const Patients  = {
    patient_id: {
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
    idNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    blood_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeofsickness: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    extra_notes: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adminID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Admin',
            key: 'adminID',
        },
    }
}
const Admin = {
    adminID: {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    occupation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Occupations',
            key: 'occupation_id',
        },
    },
};

const Occupations = {
    occupation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    occupation_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};

module.exports = {
     Patients,
     Admin,
    Occupations
};
