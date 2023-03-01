import { By } from 'selenium-webdriver';

import { makeAPICall } from '../helpers/makeAPICall';
import { equalsCheck } from '../helpers/equalsCheck';

import { sortingMethods } from '../../src/utils/sortingMethods';

export async function verifySortingByField(field, driver, options) {
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
  } finally {
    console.log('______________________________________________________');
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
