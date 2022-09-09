import { Sequelize } from "sequelize";


const db = new Sequelize('upload_db','root','senha',{
    host:'localhost',
    dialect:'mysql'
} );

export default db;