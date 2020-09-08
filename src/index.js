const express = require("express");

const router = express.Router();
const UssdMenu = require('ussd-menu-builder');
let menu = new UssdMenu();


// Define menu states
menu.startState({
    run: () => {
        // use menu.con() to send response without terminating session      
        menu.con('Welcome to MTN MoMo Clone:' 
            + '\n1. Send Money' 
            + '\n2. Buy'
            + '\n3. Pay Bill'
            + '\n4. Bank Services'
            + '\n5. Mokash'
            + '\n6. My MoMo Account'

            );
    },
    // next object links to next state based on user input
    next: {
        '1': 'showBalance',
        '2': 'buyAirtime'
    }
});

menu.state('showBalance', {
    run: () => {
        // fetch balance
        fetchBalance(menu.args.phoneNumber).then(function(bal){
            // use menu.end() to send response and terminate session
            menu.end('Your balance is KES ' + bal);
        });
    }
});

menu.state('buyAirtime', {
    run: () => {
        menu.con('Enter amount:');
    },
    next: {
        // using regex to match user input to next state
        '*\\d+': 'buyAirtime.amount'
    }
});

// nesting states
menu.state('buyAirtime.amount', {
    run: () => {
        // use menu.val to access user input value
        var amount = Number(menu.val);
        buyAirtime(menu.args.phoneNumber, amount).then(function(res){
            menu.end('Airtime bought successfully.');
        });
    }
});

// Registering USSD handler with Express

router.post('/', function(req, res){
    console.log(req.body);
    menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
});

module.exports = router;