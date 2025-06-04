import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();


const db = new Sequelize(process.env.DB_URL!, {
    models: [__dirname + "/../models/**/*.ts"],
    logging: false, 
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

export default db; 


