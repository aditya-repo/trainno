const started = Date.now()

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
//   await page.goto('https://www.confirmtkt.com/train-running-status/13332');
  await page.goto('https://www.confirmtkt.com/train-running-status/82654');

  // Wait for the JavaScript to execute
  await page.waitForTimeout(1000); // Adjust the timeout as needed

  // Extract JavaScript code from the script tag with the specific pattern
  const scriptCode = await page.evaluate(() => {
    const scriptTags = Array.from(document.getElementsByTagName('script'));

    // Define the pattern to match
    const pattern = /data\s*=\s*({[^;]+);/;

    // Search for the script containing the pattern
    const scriptWithPattern = scriptTags.find(script => pattern.test(script.textContent));

    return scriptWithPattern ? scriptWithPattern.textContent : null;
  });

  // Handle special characters such as &nbsp; before extracting the JSON-like data
  const sanitizedScriptCode = scriptCode.replace(/&nbsp;/g, ' ');

  // Extract the JSON-like data following the pattern
  const jsonData = await page.evaluate(sanitizedScriptCode => {
    if (!sanitizedScriptCode) return null;

    // Extract the data variable content
    const match = sanitizedScriptCode.match(/data\s*=\s*({[^;]+);/);

    return match ? match[1] : null;
  }, sanitizedScriptCode);

  // Parse the JSON-like string to a JavaScript object
  const parsedData = JSON.parse(jsonData);

//   const stringData = JSON.stringify(parsedData)

  console.log('Parsed Data:', parsedData);

  await browser.close();
})();