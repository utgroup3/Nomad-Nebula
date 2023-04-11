// TEMPLATE for connection.js
// Import the Sequelize library to connect to a SQL database.
const Sequelize = require('sequelize');

// Load environment variables from the .env file.
require('dotenv').config();

// Declare a variable to hold the Sequelize object.
let sequelize;


// Check if the JAWSDB_URL environment variable is set, indicating a Heroku deployment.
if (process.env.JAWSDB_URL) {
   // Create a new Sequelize object with the JAWSDB_URL environment variable.
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
   // If the JAWSDB_URL variable is not set, create a new Sequelize object with the local development environment variables.
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
  });
}

// Export the Sequelize object for use in other modules.
module.exports = sequelize;