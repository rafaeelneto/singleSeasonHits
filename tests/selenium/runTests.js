/* eslint-disable no-unused-vars */
import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

import { verifyTableCount } from './tableCount.test.js';
import { verifySortingByField } from './sortByField.test';
import { verifyFilterField } from './filterByField.test';

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
