const overrides = require('./overrides/overrides');

class ST_Location_Full {
    constructor(response) {
        let options = JSON.parse(response);
        this.locationId = options.locationId;
        this.name = options.name;
        this.countryCode = options.countryCode;
        this.latitude = options.latitude;
        this.longitude = options.longitude;
        this.regionRadius = options.regionRadius;
        this.temperatureScale = options.temperatureScale;
        this.timeZoneId = options.timeZoneId;
        this.locale = options.locale;
        this.backgroundImage = options.backgroundImage;
    }

}

class ST_Location {
    constructor(response) {
        let options = JSON.parse(response);
        this.items = [];
        this._links = [];
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
        this.locationId = options.locationId;
        this.name = options.name;
    }
}

module.exports = {
    ST_Location,
    ST_Location_Full
};
