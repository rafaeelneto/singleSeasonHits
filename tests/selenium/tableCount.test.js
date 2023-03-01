const { By } = require('selenium-webdriver');

const { makeAPICall } = require('../helpers/makeAPICall');

const {
  error,
  important,
  warning,
  success,
} = require('../helpers/consoleColor');

async function verifyTableCount(driver, options) {
  try {
    await driver.get(options.testedURL);

    // Wait for 3 seconds to give the page time to load
    await driver.sleep(3000);

    console.log(
      important(
        'Verify that the list view displays all the players retrieved from the API'
      )
    );

    // Find the table element using its ID
    const tableElement = await driver.findElement(
      By.xpath("//table[@id='data-table']")
    );

    // Count the number of table rows inside the tbody element using XPath
    const tableRows = await tableElement.findElements(By.xpath('./tbody/tr'));
    const tableRowCount = tableRows.length;
    console.log(warning(`Number of table rows: ${tableRowCount}`));

    // Make an API call to get the number of items from the external API
    const apiItemCount = await makeAPICall(options.APIUrl).length;
    console.info(warning(`Number of items from API: ${apiItemCount}`));

    // Compare the counts
    if (tableRowCount === apiItemCount) {
      console.log(
        success(
          'The number of table rows is equal to the number of items from the API.'
        )
      );
    } else {
      console.error(
        error(
          'The number of table rows is not equal to the number of items from the API.'
        )
      );
    }
  } finally {
    console.log('______________________________________________________');
    await driver.quit();
  }
}

module.exports = { verifyTableCount };
