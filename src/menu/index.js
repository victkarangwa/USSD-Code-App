const express = require("express");
const UssdMenu = require("ussd-menu-builder");
const dashboard = require("./dashboard");
const _ = require("lodash");

const UserService = require("../services/user.service");
let menu = new UssdMenu();

const index = () => {
  // Define menu states
  menu.startState({
    run: async () => {
      // use menu.con() to send response without terminating session

      const { phoneNumber } = menu.args;

      const user = await UserService.findUserByPhone(phoneNumber);

      if (user) {
        menu.con(
          `Welcome back ${user.firstName} ${user.lastName} on the Vivi savings:` +
            "\nEnter your 4-digit PIN to continue:"
        );
      } else {
        menu.con(
          `Welcome to the Vivi savings:` + "\n0. Register" + "\n99. Exit"
        );
      }
    },
    // next object links to next state based on user input
    next: {
      "*\\d{4}": "dashboard",
      "*\\w+": "register",
    },
    defaultNext: "invalidOption",
  });

  menu.state("invalidOption", {
    run: () => {
      menu.end(`Invalid option`);
    },
  });

  _.over([dashboard])(menu);

  return menu;
};

module.exports = index;
