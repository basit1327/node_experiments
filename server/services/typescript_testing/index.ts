const clc = require('cli-color');

class Greeting {
	greet():void {
		var message:string = "--- Hello World from typescript ---"
		console.log(clc.green(message));
	}
}

module.exports = {
	Greeting
};
