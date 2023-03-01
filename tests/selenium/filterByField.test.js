const { By, until } = require('selenium-webdriver');

const { makeAPICall } = require('../helpers/makeAPICall');
const { equalsCheck } = require('../helpers/equalsCheck');

const { filterFunction } = require('../../src/utils/filterMethod');

export async function verifyFilterField(field, min, max, driver, options) {
  try {
    await driver.get(options.testedURL);

    // Wait for 5 seconds to give the page time to load
    await driver.sleep(5000);

    console.log(`Verify that the field ${field} can be filtered`);

    // Click the filter button to trigger the filter menu inside the table head cell
    const rankButton = await driver.findElement(
      By.xpath(`//table[@id="data-table"]//th[@id='${field}']//button`)
    );
    await rankButton.click();

    // Wait for the filter menu to appear
    const filterMenu = await driver.wait(
      until.elementLocated(By.className('head-filter-container'))
    );

    // Set the filter inputs
    const filterInputs = await filterMenu.findElements(
      By.className('value-filter-input')
    );

    const minRankInput = filterInputs[0];
    const maxRankInput = filterInputs[1];

    await maxRankInput.clear();
    await maxRankInput.sendKeys(`${max}`);

    await minRankInput.clear();
    await minRankInput.sendKeys(`${min}`);

    // Wait for 2 seconds to give the page time to sort
    await driver.sleep(2000);

    // Get the table rows
    const tableRows = await driver.findElements(
      By.xpath('//table[@id="data-table"]/tbody/tr')
    );

    // Get the first column of each table row
    const filteredTableData = [];
    for (let i = 0; i < tableRows.length; i++) {
      const tableCells = await tableRows[i].findElements(By.xpath('td[1]'));
      const rowTexts = await Promise.all(
        tableCells.map((cell) => cell.getText())
      );
      filteredTableData.push(Number(rowTexts[0]));
    }

    const apiItems = await makeAPICall();

    const filteredApiItemsId = apiItems
      .filter(filterFunction(field)([min, max]))
      .map((item) => item.id);

    console.log(filteredApiItemsId);
    console.log(filteredTableData);

    if (equalsCheck(filteredTableData, filteredApiItemsId)) {
      console.log(`${field} succefully filtered`);
    } else {
      console.error(`Fail on filter ${field}`);
    }
  } finally {
    console.log('______________________________________________________');
    await driver.quit();
  }
}
