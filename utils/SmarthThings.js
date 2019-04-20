const Client = require('./platform/Client').Client;
const Device = require('./platform/Devices').Device;
const Location = require('./platform/Location').Location;

class SmartThingsAPI {
    constructor(options) {
        this.client = new Client(options['ST_ACCESS_TOKEN']);
        this.device = new Device(this.client);
        this.location = new Location(this.client);

    }
}

class Commands {
    constructor() {
        this.commands = [];
    }

    addCommand(command) {
        this.commands.push(command);
    }

    addCommands(commands) {
        this.commands = this.commands.concat(commands);
    }

    getCommands() {
        return this.commands;
    }
}

module.exports = {SmartThingsAPI, Commands};
