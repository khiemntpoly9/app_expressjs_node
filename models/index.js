/* eslint-disable security/detect-object-injection */
import * as dotenv from 'dotenv';
// .ENV
dotenv.config();
//
import { readdirSync } from 'fs';
import { basename, dirname } from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = {};
const sequelize = new Sequelize(config);

export default (async () => {
	const files = readdirSync(__dirname).filter(
		(file) => file.indexOf('.') !== 0 && file !== basename(__filename) && file.slice(-3) === '.js',
	);

	for await (const file of files) {
		const model = await import(`./${file}`);
		const namedModel = model.default(sequelize, DataTypes);
		db[namedModel.name] = namedModel;
	}

	Object.keys(db).forEach((modelName) => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});

	db.sequelize = sequelize;
	db.Sequelize = Sequelize;

	return db;
})();
