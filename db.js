const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: 'postgres',
});

async function Open(sql, params) {
  try {
    const result = await sequelize.query(sql, {
      replacements: params,
      type: sequelize.QueryTypes.SELECT,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.Open = Open;
