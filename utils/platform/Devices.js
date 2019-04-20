const Base = require('./Base');
const STDevicesLite = require('./scopes/Devices').ST_Devices_Lite;
const STDevice = require('./scopes/Devices').ST_Device;
const Capability = require('./scopes/Devices').Capability;
const DynamicCapability = require('./scopes/Devices').DynamicCapability;

class Device extends Base {
    constructor(client) {
        super(client);
    }

    list() {
        let options = this.client.getCallOptions(`/devices`);
        return this.client.call(options).then((response) => {
            response.setThing(
                new STDevicesLite(response.body)
            );
            console.log(response);
            return response
        }).catch((err) => {
            console.log(err);
        });
    }

    getStatus(deviceId) {
        let options = this.client.getCallOptions(`/devices/${deviceId}/status`);
        return this.client.call(options).then((response) => {
            response.setThing(
                new STDevice(response.body)
            );
            return response
        }).catch((err) => {
            console.log(err);
        });

    }

    getComponentsStatus(deviceId, componentId) {
        let options = this.client.getCallOptions(`/devices/${deviceId}/components/${componentId}/status`);
        return this.client.call(options).then((response) => {
            response.setThing(
                new Capability(JSON.parse(response.body))
            );
            return response
        }).catch((err) => {
            console.log(err);
        });
    }
    getComponentsCapabilityStatus(deviceId, componentId, capabilityName) {
        let options = this.client.getCallOptions(`/devices/${deviceId}/components/${componentId}/capabilities/${capabilityName}/status`);
        return this.client.call(options).then((response) => {
            response.setThing(
                new  DynamicCapability(capabilityName, JSON.parse(response.body))
            );
            return response
        }).catch((err) => {
            console.log(err);
        });
    }

    exeCommands(deviceId, commands) {
        let options = this.client.getCallOptions(`/devices/${deviceId}/commands`, 'POST');
        options.body = {commands : commands.getCommands()};
        options.json = true;
        return this.client.call(options).then((response) => {
            response.setThing(
                 JSON.parse(response.body)
            );
            return response
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = {Device};
