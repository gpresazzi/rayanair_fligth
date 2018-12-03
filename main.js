"use strict";

const puppeteer = require('puppeteer');
const Flight = require("flight");
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

let url = "https://www.ryanair.com/it/en/booking/home/" + from + "/" + to + "/" + startDate + "/" + endDate + "/1/0/0/0";

async function getinnerTextBySelector(puppetterPage, selector){
  const allPrices = await puppetterPage.evaluate((selector) => {
    let prices = Array();
    var list = document.querySelectorAll(selector);
    list.forEach(element => {
      prices.push(element.innerText);
    });
    return prices;
  }, selector);

  return allPrices;
}

/**
 * Parse single flight object, according to the selectors
 * @param {*} puppetterPage 
 */
async function getFlightItemList(puppetterPage){
  var flightObjects = [];

  const flightsArray = await puppetterPage.evaluate(() => {
      var flightArray = [];
      let selectorTripItem = "div.flight-header.flight-header__notice";
      selectedItems = document.querySelectorAll(selectorTripItem);

      [...selectedItems].map(element => {
        var flightItem = {};
        
        var departureSelector = "span.cities__departure";
        var destinationSelector = "span.cities__destination";
        var startTimeSelector = "div.start-time";
        var arrivalTimeSelector = "div.start-time";
        var priceSelector = "span.flights-table-price__price";

        flightItem.departure = element.querySelector(departureSelector) != null ? element.querySelector(departureSelector).innerText: "";
        flightItem.destination = element.querySelector(destinationSelector) != null ? element.querySelector(destinationSelector).innerText: "";
        flightItem.startTime = element.querySelector(startTimeSelector)!= null ? element.querySelector(startTimeSelector).innerText: "";
        flightItem.arrivalTime = element.querySelector(arrivalTimeSelector) != null ? element.querySelector(arrivalTimeSelector).innerText: "";
        flightItem.price = element.querySelector(priceSelector + "--discount") != null ? element.querySelector(priceSelector + "--discount").innerText: "";
        flightItem.discounted = true;

        if(flightItem.price == "")
        {
          flightItem.price = element.querySelector(priceSelector) != null ? element.querySelector(priceSelector).innerText: "";
          flightItem.discounted = false;
        }
      
        flightArray.push(flightItem);
      });
      return flightArray;
  });

  flightsArray.forEach(element => {
    var flightObj = new Flight();
    flightObj.startTime = element.startTime;
    flightObj.arrivalTime = element.arrivalTime;
    flightObj.price = element.price;
    flightObj.departure = element.departure;
    flightObj.destination = element.destination;
    flightObj.discounted = element.discounted;
    
    flightObjects.push(flightObj);
  });
  return flightObjects;
}

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], 
                                          ignoreHTTPSErrors: true, dumpio: false });
  const page = await browser.newPage();
  console.log(new Date() + " " + url);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  console.log(new Date() + " Download complete, waiting some seconds more ...");

  await page.waitFor(3*1000); 
  //await page.screenshot({path: '/home/screenshot.png'});

  var list = await getFlightItemList(page)
  if (list && list.length > 0)
  {
    console.log("Found " + list.length + " trips");
    list.forEach(element => { console.log("%j", element); });
  }
  else console.log("No element found");

  await browser.close();
})();