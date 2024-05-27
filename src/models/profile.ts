import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize';

export const Profile = sequelize.define('Profile', {
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    birthDate: {
        type: DataTypes.DATE,
    },
    gender: {
        type: DataTypes.STRING,
    },
    avatarURI: {
        type: DataTypes.STRING,
    },
    bannerURI: {
        type: DataTypes.STRING,
    },
});
