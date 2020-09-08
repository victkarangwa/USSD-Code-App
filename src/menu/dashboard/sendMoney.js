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
    run: async () => {
      const {
        val,
        args: { phoneNumber },
      } = menu;
      sessions["amount"] = val;
      const user = await UserService.findUserByPhone(phoneNumber.slice(3));

      const enteredAmount = JSON.parse(val);
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
      const {
        val,
        args: { phoneNumber },
      } = menu;

      const sender = await UserService.findUserByPhone(phoneNumber.slice(3));
      const reciever = await UserService.findUserByPhone(val);
     
      if (reciever) {
        const amountToSend = sessions.amount;
        const balance = sender.amount - amountToSend;

        const senderPhone = phoneNumber.slice(3);
        await UserService.updateBalance(balance, senderPhone);

        menu.end(
          `You have successfully sent RWF ${amountToSend} to ${reciever.firstName} ${reciever.lastName} (${reciever.phone}). Your new balance is RWF ${balance}`
        );
      } else {
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
