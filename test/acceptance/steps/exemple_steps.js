var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var steps = function() {

  this.Given(/^un usager non connecte$/, function(callback) {
    browser.get('/');
    callback();
  });

  this.When(/^je vais sur la page d'identification$/, function(callback) {
    element(by.id('nav-accountLoggedOff')).click().then(function () {
      element(by.id('nav-login')).click().then(function () {
        callback();
      });
    });
  });

  this.Then(/^je suis sur la page d'identification$/, function(callback) {
    expect(browser.getCurrentUrl()).to.eventually.have.string("/#/login").notify(callback);
  });

  this.Then(/^c'est inutile$/, function(callback) {
    callback();
  });

};

module.exports = steps;