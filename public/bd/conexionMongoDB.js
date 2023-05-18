const mongoose = require('mongoose');
const URL = "mongodb+srv://WDCPrado:Sideswipe_4320@cluster0.za0p9zw.mongodb.net/Bar"

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.URL || URL);
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.log('Error al conectar a la base de datos', error);
    process.exit(1);
  }
};

module.exports = conectarDB;