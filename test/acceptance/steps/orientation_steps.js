var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

//var expect = chai.expect;

var steps = function() {

  // ****************************************************************************************
  // GIVEN
  // ****************************************************************************************

  this.Given(/^un usager non connecté$/, function(callback) {
    browser.get('/');
    callback();
  });

  // ****************************************************************************************
  // WHEN
  // ****************************************************************************************

  this.When(/^je suis un particulier$/, function(callback) {
    callback();
  });

  this.When(/^je suis un employeur$/, function(callback) {
    callback();
  });

  this.When(/^ma démarche est d'employer un ressortissant étranger$/, function(callback) {
    callback();
  });

  this.When(/^je suis né le 04\/08\/1966$/, function(callback) {
    callback();
  });

  this.When(/^je suis né le 04\/08\/1967$/, function(callback) {
    callback();
  });

  this.When(/^le ressortissant étranger est né le 04\/08\/1966$/, function(callback) {
    callback();
  });

  this.When(/^je corrige ma date de naissance$/, function(callback) {
    callback();
  });

  this.When(/^je suis de nationalité argentine$/, function(callback) {
    callback();
  });

  this.When(/^le ressortissant étranger est de nationalité argentine$/, function(callback) {
    callback();
  });

  this.When(/^mon pays de résidence est Argentine$/, function(callback) {
    callback();
  });

  this.When(/^son pays de résidence est Argentine$/, function(callback) {
    callback();
  });

  this.When(/^son pays de résidence est France$/, function(callback) {
    callback();
  });

  this.When(/^la durée de mon séjour est de plus de 3 mois$/, function(callback) {
    callback();
  });

  this.When(/^la durée de son séjour est de plus de 3 mois$/, function(callback) {
    callback();
  });

  this.When(/^mon motif de séjour est l'exercice d'une activité professionnelle salariée$/, function(callback) {
    callback();
  });

  this.When(/^son motif de séjour est l'exercice d'une activité professionnelle salariée$/, function(callback) {
    callback();
  });

  this.When(/^j'ai une autorisation de travail$/, function(callback) {
    callback();
  });

  this.When(/^je n'ai pas d'autorisation de travail$/, function(callback) {
    callback();
  });

  // ****************************************************************************************
  // THEN
  // ****************************************************************************************

  this.Then(/^je vois que je suis un particulier$/, function(callback) {
    callback();
  });

  this.Then(/^je vois que je suis né le 04\/08\/1966$/, function(callback) {
    callback();
  });

  this.Then(/^je ne vois pas que je suis de nationalité argentine$/, function(callback) {
    callback();
  });

  this.Then(/^on m'oriente vers une demande d'autorisation de travail salarié$/, function(callback) {
    callback();
  });

  this.Then(/^on m'oriente vers une primo demande de titre de séjour professionnel salarié$/, function(callback) {
    callback();
  });

  this.Then(/^on m'oriente vers un site d'information relatif à l'emploi d'un ressortissant étranger résidant en France$/, function(callback) {
    callback();
  });

  this.Then(/^on m'oriente vers un site d'information relatif à l'autorisation de travail$/, function(callback) {
    callback();
  });



  // EXEMPLES POUR PLUS TARD
  // this.When(/^je suis un employeur$/, function(callback) {
  //   element(by.id('nav-accountLoggedOff')).click().then(function () {
  //     element(by.id('nav-login')).click().then(function () {
  //       callback();
  //     });
  //   });
  // });

  // this.Then(/^je suis sur la page d'identification$/, function(callback) {
  //   expect(browser.getCurrentUrl()).to.eventually.have.string("/#/login").notify(callback);
  // });

};

module.exports = steps;
