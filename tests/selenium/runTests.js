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
  const apiItems = await makeAPICall(options.APIUrl);

  await verifyTableCount(options, apiItems);

  await verifySortingByField('Rank', options, apiItems);
  await verifySortingByField('Hits', options, apiItems);

  await verifyFilterField('Rank', 20, 70, options, apiItems);
  await verifyFilterField('AgeThatYear', 20, 30, options, apiItems);
  await verifyFilterField('Hits', 20, 70, options, apiItems);
}

runTest();
