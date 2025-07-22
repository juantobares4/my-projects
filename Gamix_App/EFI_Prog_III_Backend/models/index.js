import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { createRequire } from 'module';

// Importar JSON usando createRequire
const require = createRequire(import.meta.url);
const config = require('../config/config.json');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];

const db = {};

const sequelize = new Sequelize(
  configEnv.database,
  configEnv.username,
  configEnv.password,
  configEnv
);

const modelFiles = fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) &&
           (file !== 'index.js') &&
           (file.slice(-3) === '.js');
  });

// Cargar modelos usando pathToFileURL
for (const file of modelFiles) {
  try {
    const modelPath = pathToFileURL(path.join(__dirname, file)).href;
    const modelFunction = await import(modelPath);
    const ModelInstance = modelFunction.default(sequelize);
    db[ModelInstance.name] = ModelInstance;
    console.log(`Modelo cargado: ${ModelInstance.name}`);
  } catch (error) {
    console.error(`Error al cargar el modelo ${file}:`, error);
  }
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

