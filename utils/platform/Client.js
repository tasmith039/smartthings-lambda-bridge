const rp = require('request-promise-native');
class SmartThingsResponse{
	constructor(options){
		this.httpCode = options['httpCode'];
		this.status = options['status'];
		this.body = options['body'];
	}
	setThing(thing){
		this.thing = thing;
	}
}

class Client {
	constructor(access_token, api_version = 'Accept:application/vnd.smartthings+json;v=1') {
		this.smartthings_access_token = access_token;
		this.smartthings_api_version = api_version;
		this.request = rp;
		this.uri = 'https://api.smartthings.com';
	}
	getCallOptions(path, method = 'GET'){
		return {
			method: method,
			uri: `${this.uri}${path}`,
			headers: {
				'Authorization': "Bearer " + this.smartthings_access_token,
				"Accept": this.smartthings_api_version
			},
			resolveWithFullResponse: true,
			json: true
		};
	}
	call(options){
		return this.request(options).then((response) => {
			return new SmartThingsResponse({
				'httpCode': response.statusCode,
				'status': "Success",
				'body': JSON.stringify(response.body),
			});
		});
	}
}
module.exports = {Client};
