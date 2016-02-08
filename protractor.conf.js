exports.config = {

  baseUrl: 'http://localhost:3000',
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: [
    'test/acceptance/features/**/*.feature'
  ],

  //resultJsonOutputFile: 'test_results/acceptance_tests_report.json',

  cucumberOpts: {
    require: ['test/acceptance/steps/**/*.js', 'test/acceptance/hooks/**/*.js'],
    format: 'json'
  }
}