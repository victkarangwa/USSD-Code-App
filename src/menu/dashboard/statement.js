const express = require("express");
const _ = require('lodash');

const UserService = require("../../services/user.service");

module.exports = menu => {
  // Define menu states
  menu.state("dashboard.statement", {
    run: async () => {
        menu.end(`Sorry, this service is unavailable at the moment. Please try again later.`);
    },

  });

  menu.state("invalidOption", {
    run: () => {
      menu.end(`Invalid option`);
    },
  });

  return menu;
};

