"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "Victor",
          lastName: "KARANGWA",
          phone: "+250789152190",
          pin: 9865,
          amount: 1000000,
          createdAt : "2018-09-28T10:55:51.603Z",
          updatedAt : "2018-09-28T10:55:51.603Z"
        },
        {
          firstName: "Ereneste",
          lastName: "HIMBAZA",
          phone: "+250782801608",
          pin: 3589,
          amount: 650000,
          createdAt : "2018-09-28T10:55:51.603Z",
          updatedAt : "2018-09-28T10:55:51.603Z"
        },
        {
          firstName: "Aliane",
          lastName: "UWASE",
          phone: "+250780726786",
          pin: 3589,
          amount: 470000,
          createdAt : "2018-09-28T10:55:51.603Z",
          updatedAt : "2018-09-28T10:55:51.603Z"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
