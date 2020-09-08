const express = require("express");
const _ = require("lodash");
const sessionMenu = require("../../utils/sessionHandler");

const UserService = require("../../services/user.service");
let sessions = {};

module.exports = (menu) => {
  // Define menu states
  menu.state("dashboard.sendMoney", {
    run: async () => {
      const { val } = menu;
      menu.con(`Enter amount to send`);
    },
    // next object links to next state based on user input
    next: {
      "*\\d": "dashboard.sendMoney.receiver",
    },
    defaultNext: "invalidOption",
  });

  menu.state("dashboard.sendMoney.receiver", {
    run: async() => {
      const {
        val,
        args: { phoneNumber },
      } = menu;
      sessions["amount"] = val;
      const user = await UserService.findUserByPhone(phoneNumber.slice(3));

      const enteredAmount = JSON.parse(val)
      console.log(enteredAmount, user.amount);
      if (val > user.amount) {
        menu.end("Sorry, you don't have sufficient amount to send!");
      } else {
        menu.con(`Enter phone number to send to`);
      }
    },
    // next object links to next state based on user input
    next: {
      "*\\d{10}": "dashboard.sendMoney.send",
    },
    defaultNext: "invalidOption",
  });

  menu.state("dashboard.sendMoney.send", {
    run: async () => {
      const { val: receiver, args: {phoneNumber} } = menu;
      const user =await UserService.findUserByPhone(receiver);
      const balance = user.amount - sessions.amount;
      
      await UserService.update(balance,phoneNumber.slice(3));

      if(user){
        menu.end(`You have successfully sent ${sessions.amount} to ${user.firstName} ${user.lastName}. Your new balance is ${balance} RWF`);

      }else{
        menu.end("Invalid receipient");
      }

    },
    // next object links to next state based on user input
    next: {
      "*\\d{10}": "dashboard.sendMoney.send",
    },
  });

  menu.state("invalidOption", {
    run: () => {
      menu.end(`Incorrect input`);
    },
  });

  return menu;
};
