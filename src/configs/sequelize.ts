import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.SEQUELIZE_DB!,
    process.env.SEQUELIZE_USERNAME!,
    process.env.SEQUELIZE_PASSWORD,
    {
        host: process.env.SEQUELIZE_HOST,
        dialect: 'postgres',
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been successfully.');
    })
    .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
    });

export default sequelize;