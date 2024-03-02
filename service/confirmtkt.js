const puppeteer = require('puppeteer');

const fetchPnr = async (pnr) => {

  // const browser = await puppeteer.launch();

  // ## Modify the code as below
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
  })
  const page = await browser.newPage();
  await page.goto(`https://www.confirmtkt.com/pnr-status/${pnr}`);

  // Wait for the JavaScript to execute
  await page.waitForTimeout(1000); // Adjust the timeout as needed

  // Extract JavaScript code from the script tag with the specific keyword
  const scriptCode = await page.evaluate(() => {
    const scriptTags = Array.from(document.getElementsByTagName('script'));
    const keyword = 'var data'; // Replace with the actual keyword
    let scriptWithKeyword = null;

    for (const scriptTag of scriptTags) {
      if (scriptTag.textContent.includes(keyword)) {
        scriptWithKeyword = scriptTag.textContent;
        break;
      }
    }

    return scriptWithKeyword;
  });

  // Extract the data variable content from the filtered script
  const dataVariableValue = await page.evaluate(scriptCode => {
    if (!scriptCode) return null;

    // Find the pattern of the desired variable
    const regex = /data\s*=\s*({[^;]+);/g;
    const match = regex.exec(scriptCode);

    return match ? match[1] : null;
    // return match
  }, scriptCode);

  // console.log('Data variable value:\n', dataVariableValue);
  let userdata;

  try {
    const jsonObject = JSON.parse(dataVariableValue);

    // Array of desired keys
    const desiredKeys = ['Pnr', 'TrainNo', 'TrainName', 'Doj', 'BookingDate', 'Quota', 'DestinationDoj', 'SourceDoj', 'From', 'To', 'ReservationUpto', 'BoardingPoint', 'Class', 'chartPrepared', 'BoardingStationName', 'ReservationUptoName', 'PassengerCount', 'DepartureTime', 'ArrivalTime', 'ExpectedPlatformNo', 'BookingFare', 'CoachPosition', 'Rating', 'FoodRating', 'PunctualityRating', 'CleanlinessRating', 'SourceName', 'DestinationName', 'Duration', 'HasPantry', 'PassengerStatus'];

    // Object to store filtered values
    const filteredValues = {};

    // Filter the desired keys
    desiredKeys.forEach(key => {
      if (jsonObject.hasOwnProperty(key)) {
        filteredValues[key] = jsonObject[key];
      }
    });

    //   console.log('PNR Data', filteredValues);
    await browser.close();
    return filteredValues;
  } catch (error) {
    await browser.close();
    return error.message;
  }

  console.log();

  //   await browser.close();

  // const endDate = Date.now()
  // console.log('Response Time : ',(endDate - started)/1000)

};

module.exports = { fetchPnr }