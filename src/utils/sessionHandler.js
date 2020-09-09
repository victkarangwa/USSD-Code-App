const UssdMenu = require("ussd-menu-builder");

let sessions = {};

let menu = new UssdMenu();
menu.sessionConfig({
    start: (sessionId, callback)=>{
        // initialize current session if it doesn't exist
        // this is called by menu.run()
        if(!(sessionId in sessions)) sessions[sessionId] = {};
        callback();
    },
    end: (sessionId, callback)=>{
        // clear current session
        // this is called by menu.end()
        delete sessions[sessionId];
        callback();
    },
    set: (sessionId, key, value, callback) => {
        // store key-value pair in current session
        sessions[sessionId][key] = value;
        callback();
    },
    get: (sessionId, key, callback)=>{
        // retrieve value by key in current session
        let value = sessions[sessionId][key];
        callback(null, value);
    }
});

module.exports = menu;