const Base = require('./Base');
const STLocation = require('./scopes/Location').ST_Location;
const STLocationFull = require('./scopes/Location').ST_Location_Full;

class Location extends Base{
    constructor(client){
        super(client);
    }
    list(){
        let options = this.client.getCallOptions('/locations');
        return this.client.call(options)
            .then((response) => {
                response.setThing(
                    new STLocation(response.body)
                );
                return response
            })
            .catch((err) => {
                console.log(err);
            });
    }
    /*
    getLocation() returns a new a chainable
    call to get a location object based on
    the passed-in
     */
    get(locationId){
        let options = this.client.getCallOptions(`/locations/${locationId}`);
        return this.client.call(options)
            .then((response) => {
                response.setThing(
                    new STLocationFull(response.body)
                );
                return response
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = {Location};
