const express = require("express");
const _ = require('lodash');

const savings = require('./savings');
const sendMoney = require('./sendMoney');
const settings = require('./settings');
const statement = require('./statement');




const dashboardInstructions = `Choose a service to proceed: \n1. Send Money \n2. Check savings \n3. View Mini-statement \n4. Change Pin`;

module.exports = menu => {
  // Define menu states
  menu.state("dashboard", {
    run: async () => {
      // use menu.con() to send response without terminating session

      const {
        val,
        args: { phoneNumber }
    } = menu;

      menu.con(dashboardInstructions)
    },
    // next object links to next state based on user input
    next: {
        '1': 'dashboard.sendMoney',
        '2': 'dashboard.savings',
        '3': 'dashboard.statements',
        '4': 'dashboard.changePin'
    }
  });

  menu.state("invalidOption", {
    run: () => {
      menu.end(`Invalid option`);
    },
  });

  _.over([savings,sendMoney,statement,settings])(menu)

  return menu;
};

