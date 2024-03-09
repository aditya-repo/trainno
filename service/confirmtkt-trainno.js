const puppeteer = require('puppeteer');

const fetchTrainno = async (trainno) => {

  // const browser = await puppeteer.launch();

  // ## Modify the code as below
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
  })
  const page = await browser.newPage();
  await page.goto(`https://www.confirmtkt.com/train-schedule/${trainno}`);

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

//   console.log(scriptCode);

  // Extract the data variable content from the filtered script
  const dataVariableValue = await page.evaluate(scriptCode => {
    if (!scriptCode) return null;

    var regex = /var\s+data\s*=\s*'([^']+)'/;

    // Match the data using the regular expression
    var match = scriptCode.match(regex);
    
    // Check if a match is found
    if (match && match[1]) {
      // Parse the matched data into a JavaScript object
      var jsonData = JSON.parse(match[1]);
    
      // Output the parsed data
      console.log(jsonData);
    }
    
    return match ? match[1] : null;
    // return match
  }, scriptCode);
  
//   console.log(dataVariableValue);

  
  // console.log('Data variable value:\n', dataVariableValue);
  let userdata;

  try {
    const jsonObject = JSON.parse(dataVariableValue);

    // // Array of desired keys
    // const desiredKeys = ['Pnr', 'TrainNo', 'TrainName', 'Doj', 'BookingDate', 'Quota', 'DestinationDoj', 'SourceDoj', 'From', 'To', 'ReservationUpto', 'BoardingPoint', 'Class', 'chartPrepared', 'BoardingStationName', 'ReservationUptoName', 'PassengerCount', 'DepartureTime', 'ArrivalTime', 'ExpectedPlatformNo', 'BookingFare', 'CoachPosition', 'Rating', 'FoodRating', 'PunctualityRating', 'CleanlinessRating', 'SourceName', 'DestinationName', 'Duration', 'HasPantry', 'PassengerStatus'];

    // // Object to store filtered values
    // const filteredValues = {};

    // // Filter the desired keys
    // desiredKeys.forEach(key => {
    //   if (jsonObject.hasOwnProperty(key)) {
    //     filteredValues[key] = jsonObject[key];
    //   }
    // });

    //   console.log('PNR Data', filteredValues);
    await browser.close();
    return jsonObject;
  } catch (error) {
    await browser.close();
    return error.message;
  }

  console.log();

  //   await browser.close();

  // const endDate = Date.now()
  // console.log('Response Time : ',(endDate - started)/1000)

};

module.exports = { fetchTrainno }