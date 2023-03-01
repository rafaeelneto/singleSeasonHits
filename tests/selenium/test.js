/* eslint-disable no-unused-vars */
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const axios = require('axios');

const options = {
  browser: 'chrome',
  server: 'http://localhost:4444/wd/hub',
  testedURL: 'http://localhost:8081/',
  APILink: 'https://api.sampleapis.com/baseball/hitsSingleSeason',
};

const sortingMethods = {
  asc: (fieldName) => (a, b) => {
    if (a[fieldName] === '' || a[fieldName] === null) return -1;
    if (b[fieldName] === '' || b[fieldName] === null) return 1;
    if (a[fieldName] === b[fieldName]) return 0;
    return Number(a[fieldName]) > Number(b[fieldName]) ? -1 : 1;
  },
  desc: (fieldName) => (a, b) => {
    if (a[fieldName] === '' || a[fieldName] === null) return 1;
    if (b[fieldName] === '' || b[fieldName] === null) return -1;
    if (a[fieldName] === b[fieldName]) return 0;
    return Number(a[fieldName]) < Number(b[fieldName]) ? -1 : 1;
  },
};

const equalsCheck = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

async function makeAPICall() {
  const apiResponse = await axios.get(options.APILink);
  return apiResponse.data;
}

const filterFunction = (fieldName, newValue) => {
  return (row) => {
    let rowFieldValue = row[fieldName];
    if (rowFieldValue === '') {
      rowFieldValue = 0;
    }
    return rowFieldValue >= newValue[0] && rowFieldValue <= newValue[1];
  };
};

async function verifyTableCount() {
  let driver = await new Builder()
    .forBrowser(options.browser)
    .usingServer(options.server)
    .build();
  try {
    await driver.get(options.testedURL);

    // Wait for 5 seconds to give the page time to load
    await driver.sleep(5000);

    console.log(
      'Verify that the list view displays all the players retrieved from the API'
    );

    // Find the table element using its ID
    const tableElement = await driver.findElement(
      By.xpath("//table[@id='data-table']")
    );

    // Count the number of table rows inside the tbody element using XPath
    const tableRows = await tableElement.findElements(By.xpath('./tbody/tr'));
    const tableRowCount = tableRows.length;
    console.log(`Number of table rows: ${tableRowCount}`);

    // Make an API call to get the number of items from the external API
    const apiItemCount = await makeAPICall().length;
    console.info(`Number of items from API: ${apiItemCount}`);

    // Compare the counts
    if (tableRowCount === apiItemCount) {
      console.log(
        'The number of table rows is equal to the number of items from the API.'
      );
    } else {
      console.error(
        'The number of table rows is not equal to the number of items from the API.'
      );
    }

    console.log('______________________________________________________');
  } finally {
    await driver.quit();
  }
}

async function verifySortingByField(field) {
  let driver = await new Builder()
    .forBrowser(options.browser)
    .usingServer(options.server)
    .build();
  try {
    await driver.get(options.testedURL);

    // Wait for 5 seconds to give the page time to load
    await driver.sleep(5000);

    console.log(`Verify that the field ${field} can be sorted`);

    // Find the table element using its ID
    const tableElement = await driver.findElement(
      By.xpath("//table[@id='data-table']")
    );

    // Find the table header row element using XPath
    const tableHeaderRow = await tableElement.findElement(
      By.xpath('./thead/tr')
    );

    // Find the 'field' column header element using XPath
    const headerElement = await tableHeaderRow.findElement(
      By.xpath(`.//th[@id='${field}']`)
    );

    let sortedTableData = await triggerSortFieldAndReturnSortedTableData(
      headerElement,
      driver,
      tableElement
    );

    // Make an API call to get the items from the external API and filter the results
    const apiItems = await makeAPICall();

    // console.log('Ascending sorted table data:', sortedTableData);

    let sortedApiItemsId = apiItems
      .sort(sortingMethods.asc(field))
      .map((item) => item.id);

    // console.log('Ascending sorted API data:', sortedApiItemsId);

    if (equalsCheck(sortedApiItemsId, sortedTableData)) {
      console.log(`${field} succefully increasing sorted`);
    } else {
      console.error(`Fail on sorting ${field}`);
    }

    sortedTableData = await triggerSortFieldAndReturnSortedTableData(
      headerElement,
      driver,
      tableElement
    );

    // console.log('Descending sorted table data:', sortedTableData);

    sortedApiItemsId = apiItems
      .sort(sortingMethods.desc(field))
      .map((item) => item.id);

    // console.log('Descending sorted API data:', sortedApiItemsId);

    if (equalsCheck(sortedApiItemsId, sortedTableData)) {
      console.log(`${field} succefully decreasing sorted`);
    } else {
      console.error(`Fail on sorting ${field}`);
    }

    console.log('______________________________________________________');
  } finally {
    await driver.quit();
  }
}

async function triggerSortFieldAndReturnSortedTableData(
  headerElement,
  driver,
  tableElement
) {
  // Triggers the click event
  await headerElement.click();

  // Wait for 2 seconds to give the page time to sort
  await driver.sleep(2000);

  // Find the table body element using XPath
  const tableBodyElement = await tableElement.findElement(By.xpath('./tbody'));

  // Get the sorted table data by iterating over the rows in the table
  const sortedTableData = [];
  const tableRows = await tableBodyElement.findElements(By.xpath('./tr'));
  for (let i = 0; i < tableRows.length; i++) {
    const tableCells = await tableRows[i].findElements(By.xpath('td[1]'));
    const rowTexts = await Promise.all(
      tableCells.map((cell) => cell.getText())
    );
    sortedTableData.push(Number(rowTexts[0]));
  }

  return sortedTableData;
}

async function verifyFilterField(field, min, max) {
  let driver = await new Builder()
    .forBrowser(options.browser)
    .usingServer(options.server)
    .build();
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
      .filter(filterFunction(field, [min, max]))
      .map((item) => item.id);

    console.log(filteredApiItemsId);
    console.log(filteredTableData);

    if (equalsCheck(filteredTableData, filteredApiItemsId)) {
      console.log(`${field} succefully filtered`);
    } else {
      console.error(`Fail on filter ${field}`);
    }

    // console.log('______________________________________________________');
  } finally {
    await driver.quit();
  }
}

verifyTableCount();
verifySortingByField('Rank');
verifySortingByField('Hits');

verifyFilterField('Rank', 20, 70);
verifyFilterField('AgeThatYear', 20, 30);
verifyFilterField('Hits', 20, 70);
