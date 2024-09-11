import { Sequelize } from 'sequelize-typescript';
import { Item } from '../models/Item';

const sequelize = new Sequelize({
    database: 'el_dorado',
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: '',
    models: [Item],
});

export default sequelize;
