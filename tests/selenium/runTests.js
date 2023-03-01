const { verifyTableCount } = require('./tableCount.test.js');
const { verifySortingByField } = require('./sortByField.test');
const { verifyFilterField } = require('./filterByField.test');
const { makeAPICall } = require('../helpers/makeAPICall');

const options = {
  browser: 'chrome',
  server: 'http://localhost:4444/wd/hub',
  testedURL: 'http://localhost:8080/',
  APIUrl: 'https://api.sampleapis.com/baseball/hitsSingleSeason',
};

console.log(`TESTING APPLICATION ON ${options.testedURL}`);

async function runTest() {
  const apiItems = JSON.stringify(await makeAPICall(options.APIUrl));

  await verifyTableCount(options, JSON.parse(apiItems));

  await verifySortingByField('Rank', options, JSON.parse(apiItems));
  await verifySortingByField('Hits', options, JSON.parse(apiItems));

  await verifyFilterField('Rank', 20, 70, options, JSON.parse(apiItems));
  await verifyFilterField('AgeThatYear', 20, 30, options, JSON.parse(apiItems));
  await verifyFilterField('Hits', 210, 230, options, JSON.parse(apiItems));
}

runTest();
