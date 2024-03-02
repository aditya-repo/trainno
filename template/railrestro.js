const axios = require('axios');
const cheerio = require('cheerio');

const started = Date.now()

const websiteUrl = 'https://www.railrestro.com/orders/pnr?pnr=2637562990';

axios.get(websiteUrl)
  .then(response => {
    // Load the HTML content into cheerio
    const $ = cheerio.load(response.data);

    // Filter a specific div by its class or ID
    const specificDivContent = $('#accordion')

        // Initialize an empty object
        const resultObject = {};
        let emptyObject = {}

    specificDivContent.find('.stcard').each((index, element) => {
        const result = $(element).find('.card-header')
        const stationdetails = $(result).find('.pull-left')
        const stationname = $(stationdetails).find('b').html()
        const stationcodeelement = stationdetails.clone().find('b').remove().end()
        const stationcode = stationcodeelement.text().trim()


        const timing = $(result).find('.pull-right')

        const date = timing.find('b').first().html()
        const time = timing.find('b').last().html()

        // resultObject[]
        // console.log(`${stationname} : ${stationcode}`);


        emptyObject = {
            "stationname": stationname,
            "stationcode": stationcode,
            "date": date,
            "time": time
        }

        resultObject[(index+1)] = emptyObject
        
        // console.log(index, time);
      });

      console.log(resultObject);

      const endDate = Date.now()
      console.log((endDate - started)/1000);
    // Print the content of the specific div
    // console.log(specificDivContent);
  })
  .catch(error => {
    console.error('Error fetching data:', error.message);
  });