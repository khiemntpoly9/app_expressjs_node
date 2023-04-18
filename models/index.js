/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable no-undef */
/* eslint-disable security/detect-non-literal-require */
/* eslint-disable security/detect-object-injection */
import * as dotenv from 'dotenv';
// .ENV
dotenv.config();
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import configDB from '../config/config.js';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configDB[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js' &&
			file.indexOf('.test.js') === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
