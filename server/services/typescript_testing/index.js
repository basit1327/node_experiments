var clc = require('cli-color');
var Greeting = /** @class */ (function () {
    function Greeting() {
    }
    Greeting.prototype.greet = function () {
        var message = "--- Hello World from typescript ---";
        console.log(clc.green(message));
    };
    return Greeting;
}());
module.exports = {
    Greeting: Greeting
};
