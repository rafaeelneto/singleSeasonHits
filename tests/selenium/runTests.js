const { Builder } = require('selenium-webdriver');
// const chrome = require( 'selenium-webdriver/chrome');

const { verifyTableCount } = require('./tableCount.test.js');
const { verifySortingByField } = require('./sortByField.test');
const { verifyFilterField } = require('./filterByField.test');

const options = {
  browser: 'chrome',
  server: 'http://localhost:4444/wd/hub',
  testedURL: 'http://localhost:8081/',
  APIUrl: 'https://api.sampleapis.com/baseball/hitsSingleSeason',
};

const driver = new Builder()
  .forBrowser(options.browser)
  .usingServer(options.server)
  .build();

console.log(`TESTING APPLICATION ON ${options.testedURL}`);

verifyTableCount(driver, options).then(() => {});

verifySortingByField('Rank', driver, options).then(() => {});
verifySortingByField('Hits', driver, options).then(() => {});

verifyFilterField('Rank', 20, 70, driver, options).then(() => {});
verifyFilterField('AgeThatYear', 20, 30, driver, options).then(() => {});
verifyFilterField('Hits', 20, 70, driver, options).then(() => {});
