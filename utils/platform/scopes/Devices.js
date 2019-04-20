const overrides = require('./overrides/overrides');

class ST_Devices_Lite {
    constructor(response) {
        let options = JSON.parse(response);
        this.items = [];
        this._links = options._links;
        this.addItems(options.items)
    }

    addItems(items) {
        items.forEach((item) => {
            this.items.push(new Item(item));
        });
    }
}

class Item {
    constructor(options) {
        this.deviceId = options.deviceId;
        this.name = options.name;
        this.label = options.label;
        this.deviceManufacturerCode = options.deviceManufacturerCode;
        this.locationId = options.locationId;
        this.roomId = options.roomId;
        this.deviceTypeId = options.deviceTypeId;
        this.deviceTypeName = options.deviceTypeName;
        this.deviceNetworkType = options.deviceNetworkType;
        this.components = [];
        this.dth = new DTH(options.dth);
        this.type = options.type;
        this.addComponents(options.components);
    }

    addComponents(components) {
        components.forEach((component) => {
            this.components.push(new Component_lite(component));
        });
    }
}

class DTH {
    constructor(options) {
        this.deviceTypeId = options.deviceTypeId;
        this.deviceTypeName = options.deviceTypeName;
        this.deviceNetworkType = options.deviceNetworkType;
        this.completedSetup = options.completedSetup;
        this.networkSecurityLevel = options.networkSecurityLevel;
        this.hubId = options.hubId;
    }
}

class Component_lite {
    constructor(options) {
        this.id = options.id;
        this.capabilities = [];
        this.addCapabilities(options.capabilities);
    }

    addCapabilities(capabilities) {
        capabilities.forEach((capability) => {
            this.capabilities.push(new Capability_lite(capability.id, capability.version));
        });
    }
}

class Capability_lite {
    constructor(id, version) {
        this.id = id;
        this.version = version;
    }
}

class ST_Device {
    constructor(response) {
        let options = JSON.parse(response);
        this.components = [];
        this.addComponents(options.components);
    }

    addComponents(components) {
        components.forEach((item, name) => {
            this.components.push(new Component(name, item));
        });
    }
}

class Component {
    constructor(name, capabilities) {
        this.addCapabilities(name, capabilities);
    }

    addCapabilities(name, value) {
        this[name] = new Capability(value);
    }
}

class Capability {
    constructor(options) {
        this.actuator = options.actuator ? new actuator(options.actuator) : null;
        this.refresh = options.refresh ? new refresh(options.refresh) : null;
        this.sensor = options.sensor ? new sensor(options.sensor) : null;
        this.stswitch = options.switch ? new stswitch(options.switch) : null;
        this.switchLevel = options.switchLevel ? new switchLevel(options.switchLevel) : null;
        this.colorControl = options.colorControl ? new colorControl(options.colorControl) : null;
        this.configuration = options.configuration ? new configuration(options.configuration) : null;
        this.healthCheck = options.healthCheck ? new healthCheck(options.healthCheck) : null;
    }
}

class switchLevel {
    constructor(options) {
        this.level = {
            value: options['level']['value'],
            unit: options['level']['unit']
        };
    }
}

class actuator {
    constructor(options) {
    }
}

class refresh {
    constructor(options) {
    }
}

class sensor {
    constructor(options) {
    }
}

class stswitch {
    constructor(options) {
        this.switch = {
            value: options['switch']['value']
        };
    }
}

class colorControl {
    constructor(options) {
        this.saturation = {
            value: options['saturation']['value']
        }
        this.color = {
            value: options['color']['value']
        }
        this.hue = {
            value: options['saturation']['value']
        }
    }
}

class healthCheck {
    constructor(options) {
        this.checkInterval = options['checkInterval'];
        this.healthStatus = options['healthStatus'];
        this.healthStatus2 = {
            value: options['healthStatus']['value'],
            data: options['healthStatus']['data']
        };
        this.DeviceWatchDeviceStatus = options['DeviceWatch-DeviceStatus'];
    }
}

class configuration {
    constructor(options) {
    }
}

/*
    This class sucks. I dont know of a better way around it...
 */
class DynamicCapability {
    constructor(name, options) {
        const Capability_list = {
            switchLevel: switchLevel,
            actuator: actuator,
            refresh: refresh,
            sensor: sensor,
            switch: stswitch,
            colorControl: colorControl,
            healthCheck: healthCheck,
            configuration: configuration
        };
        return new Capability_list[name](options);
    }
}

module.exports = {
    ST_Devices_Lite,
    ST_Device,
    Capability,
    DynamicCapability
};