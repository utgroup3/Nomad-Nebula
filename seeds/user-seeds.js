const { User } = require('../models');

const userData = [
  {
    username: "Alex",
    birthday: "1990-02-28",
    location: "Toronto",
    password: "test",
  },
  {
    username: "Joseph",
    birthday: "1999-06-21",
    location: "Nunavut",
    password: "test",
  },
  {
    username: "Jessica",
    birthday: "1930-01-01",
    location: "Russia",
    password: "test",
  },
  {
    username: "Lauren",
    birthday: "2010-09-30",
    location: "Quebec",
    password: "test",
  },
  {
    username: "Lee",
    birthday: "1990-4-26",
    location: "Hong Kong",
    password: "test",
  },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;