'use strict';

module.exports = function TakeScreenshot() {
    this.After(function (scenario, callback) {
        if (scenario.isFailed()) {
            browser.takeScreenshot().then(function (png) {
                var decodedImage = new Buffer(png, 'base64').toString('binary');
                scenario.attach(decodedImage, 'image/png');

                callback();
            });
        } else {
            callback();
        }
    });
};

var myAfterHooks = function () {
  this.registerHandler('AfterFeature', function (event, callback) {
    console.log(event);
    callback();
  });
};
module.exports = myAfterHooks;
