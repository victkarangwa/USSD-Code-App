const express = require("express");
const _ = require("lodash");

const UserService = require("../../services/user.service");
const { session } = require("../../utils/sessionHandler");

let seesion = {};

module.exports = (menu) => {
  // Define menu states
  menu.state("dashboard.settings", {
    run: async () => {
      menu.con(`Enter your 4-digit new pin`);
    },
    // next object links to next state based on user input
    next: {
      "*\\d{4}": "dashboard.settings.newPin",
    },
  });

  menu.state("dashboard.settings.newPin", {
    run: async () => {
      const { val } = menu;
      session["newPin"] = val;

      menu.con(`Confirm your 4-digit new pin`);
    },
    // next object links to next state based on user input
    next: {
      "*\\d{4}": "dashboard.settings.updatePin",
    },
    defaultNext: "invalidOption",
  });

  menu.state("dashboard.settings.updatePin", {
    run: async () => {
      const {
        val,
        args: { phoneNumber },
      } = menu;
      if (session.newPin === val) {
        await UserService.changePin(session.newPin, phoneNumber.slice(3));
        menu.end(`You have successfully changed your pin! `);
      } else {
        menu.end(`Your new pin don't match`);
      }
    },
  });

  menu.state("invalidOption", {
    run: () => {
      menu.end(`Invalid option`);
    },
  });

  return menu;
};
