const puppeteer = require('puppeteer');

console.log("Parameters: ");
var program = require('commander');

program
  .version('0.1.0')
  .option('-f, --from [type]', 'From airport')
  .option('-t, --to [type]', 'To destination (airport code)')
  .option('-s, --start-date [type]', 'Add start date')
  .option('-e, --end-date [type]', 'Add end date')
  .parse(process.argv);

let from = "DUB";
let to = "BGY";
let startDate = "2018-12-07";
let endDate = "2018-12-09";

if (program.from) from = program.from;
if (program.to) to = program.to;
if (program.startDate) startDate = program.startDate;
if (program.endDate) endDate = program.endDate;

let url = "https://www.ryanair.com/us/en/booking/home/" + from + "/" + to + "/" + startDate + "/" + endDate + "/1/0/0/0";

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], 
                                          ignoreHTTPSErrors: true, dumpio: false });
  const page = await browser.newPage();
  console.log(new Date() + " " + url);
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });
  console.log(new Date() + " Download complete, waiting some seconds more ...");

  await page.waitFor(3*1000); 
  //await page.screenshot({path: '/home/screenshot.png'});

  var selector = "span.flights-table-price__price--discount";
  console.log(new Date() + " Selector:" + selector);
  const allPrices = await page.evaluate((selector) => {
    let prices = Array();
    var list = document.querySelectorAll(selector);
    list.forEach(element => {
      prices.push(element.innerText);
    });
    return prices;
  }, selector);

  if (allPrices && allPrices.length > 0)
  {
    console.log("Found " + allPrices.length + " prices");
    allPrices.forEach(element => {
      console.log(element);
    });
  }
  else console.log("No element found");

  await browser.close();
})();