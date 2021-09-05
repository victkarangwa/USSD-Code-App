const express = require("express");
const _ = require('lodash');

const UserService = require("../../services/user.service");

module.exports = menu => {
  // Define menu states
  menu.state("dashboard.savings", {
    run: async () => {
      // use menu.con() to send response without terminating session

      const { phoneNumber } = menu.args;

      const user = await UserService.findUserByPhone(phoneNumber);

      menu.con(`You have so far saved ${user.amount} RWF \n 0. Dashboard`);
    },
    // next object links to next state based on user input
    next: {
      "0": "dashboard",
    },
  });

  menu.state("invalidOption", {
    run: () => {
      menu.end(`Invalid option`);
    },
  });

  return menu;
};

