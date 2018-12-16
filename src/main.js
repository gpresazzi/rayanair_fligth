"use strict";

const Flight = require("flight");
const Scrape = require("flight_scrape");
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

(async () => {
  var scraper = new Scrape();
  var list = await scraper.scrape(from, to, startDate, endDate);

  if (list && list.length > 0)
  {
    console.log("Found " + list.length + " trips");
    list.forEach(element => { console.log("%j", element); });
  }
  else console.log("No element found");
})();