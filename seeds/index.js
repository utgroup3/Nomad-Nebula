const sequelize = require('../config/connection');
const seedComment = require('./comment-seeds');
const seedUser = require('./user-seeds');
const seedPost = require('./post-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUser();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedPost();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedComment();
  console.log('\n----- TAGS SEEDED -----\n');


  process.exit(0);
}

seedAll();
