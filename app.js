let color = require('./utils/ColorHelper').Color;
let smartThingsAPI = require('./utils/SmarthThings').SmartThingsAPI;
let command = require('./utils/SmarthThings').Commands;
require('dotenv').config();

let api = new smartThingsAPI({
    'ST_ACCESS_TOKEN': process.env.ST_ACCESS_TOKEN,
    'ST_API_VERSION': process.env.ST_API_VERSION
});
exports.handler = (event, context) => {
    let api = new smartThingsAPI({
        'ST_ACCESS_TOKEN': process.env.ST_ACCESS_TOKEN,
        'ST_API_VERSION': process.env.ST_API_VERSION
    });
    switch (event.clickType) {
        case 'SINGLE':
            // Turn White Light on @ 10%
            break;
        case 'DOUBLE':
            // Turn off
            break;
        case 'LONG':
            // Turn White Light on @ 100%
            break;
        default:
            break;
    }
};


// api.device.list().then((call) => {
//     console.log(call.thing);
// });
console.log('<------------------------------------------------->');

// api.device.getStatus("e74fc45f-bbd6-443b-b9d5-7602dc7e5116").then((call) => {
//    console.log(call.thing);
// });

// api.device.getComponentsStatus("e74fc45f-bbd6-443b-b9d5-7602dc7e5116", 'ep08').then((call) => {
//    console.log(call.thing);
// });

// api.device.getComponentsCapabilityStatus("e74fc45f-bbd6-443b-b9d5-7602dc7e5116", 'ep08', 'switch').then((call) => {
//     console.log(call.thing);
// });

let singleColor = new color({
    hex: '#696969'
});


let commands = new command();
commands.addCommand(color.getRedCommand(10));

api.device.exeCommands("e74fc45f-bbd6-443b-b9d5-7602dc7e5116", commands).then((call) => {
    console.log(call.thing);
});