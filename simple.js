const playwright = require('playwright');
const browserType = 'chromium'; // chrome
//const browserType = 'firefox'; // firefox
//const browserType = 'webkit'; // safari

async function main() {

  // disable headless to see the browser's action
  const browser = await playwright[browserType].launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage(); //wait for the browser to create a new page by putting await
  await page.goto('http://google.com'); //opening Google page
  await page.waitForLoadState('load');

  const searchTerm = 'Automation Bots';//the term to be searched in Google searchbar

  const input = await page.$('[name="q"]');//unique element in the search bar section of inspect source
  await input.type(searchTerm);
  await page.waitForTimeout(2000);//wait 2000 ms before pressing enter so that the entire term is typed
  await input.press('Enter');

  await page.waitForLoadState('load');
  await page.screenshot({ path: './screenshot/result1.png' });//taking screenshot of the page loaded
  await page.waitForTimeout(3000);//wait 3s after taking screenshot 

  // google changes where "news", "images", "shopping", etc. are, so be mindful of the data-hveid value. Might be a better way
  const imageClicks = await page.$('[data-hveid="CAIQAw"]'); //clicking the images link
  await imageClicks.click();
  await page.waitForLoadState('load');
  await page.waitForTimeout(3000);

  await page.screenshot({ path: './screenshot/result2.png' });//taking screenshot of the new page loaded
  await page.waitForTimeout(3000);

  // [alt="Types of Bots in Automation Anywhere | Robotic Process Automation | justSajid"] was originally here but doesn't work
  // google uses data-ri="0" for first image data-ri="1" for the second and so on
  const imageOne = await page.$('[data-ri="0"]'); //clicking the first image
  await imageOne.click();
  await page.waitForLoadState('load');
  await page.waitForTimeout(3000);

  await page.screenshot({ path: './screenshot/result3.png' });
  await page.waitForTimeout(3000);

  await context.close();
  await browser.close(); //close the browser once everything is done

};

main();