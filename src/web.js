var express = require("express");
var moment = require("moment");
var Scrape = require("flight_scrape");
var app = express();

const PORT = 3000;

String.prototype.format = function() {
  a = this;
  for (k in arguments) {
    a = a.replace("{" + k + "}", arguments[k])
  }
  return a;
}

function getIATACode(city){
  var iataCodes = {};
  iataCodes["milano"] = "MXP";
  iataCodes["malpensa"] = "MXP";
  iataCodes["linate"] = "LIN";
  iataCodes["bergamo"] = "BGY";
  iataCodes["dublino"] = "DUB";
  iataCodes["londra"] = "STN";
  iataCodes["amsterdam"] = "AMS";

  console.log(city);
  if(city.length > 3) {
    return iataCodes[city.toLowerCase()];
  }
  else {
    return city.toUpperCase();
  }
}

const scrape = async function(from, to, startDate, endDate, callback){
  //scrape
  var scraper = new Scrape();
  var list = await scraper.scrape(from, to, startDate, endDate);

  if (list && list.length > 0)
  {
    console.log("Found " + list.length + " trips");
    list.forEach(element => { console.log("%j", element); });
  }
  else console.log("No element found");

  callback(list);
}

app.get('/api/v1/flight/:src/:dst/', (req, res) => {
  const src = req.params.src;
  const dst = req.params.dst;

  const dayINeed = 5; // for Friday
  const today = moment().isoWeekday();
  let friday = null;
  let sunday = null;
  if (today <= dayINeed) { 
    friday = moment().isoWeekday(dayINeed);
    sunday = moment().isoWeekday(dayINeed + 2);
  } else {
    // otherwise, give me *next week's* instance of that same day
    friday = moment().add(1, 'weeks').isoWeekday(dayINeed);
    sunday = moment().add(1, 'weeks').isoWeekday(dayINeed + 2);
  }

  citySrc = getIATACode(src);
  cityDst = getIATACode(dst);

  scrape(citySrc, cityDst, friday.format("YYYY-MM-DD"), sunday.format("YYYY-MM-DD"), (list) => {
    return res.status(200).send({
      success: 'true',
      message: "{0}".format(JSON.stringify(list)),  
    });
  });
});

app.get('/api/v1/flight/:src/:dst/:from/:to/', (req, res) => {
  const src = req.params.src;
  const dst = req.params.dst;
  const from = moment(req.params.from, "YYYYMMDD");
  const to = moment(req.params.to, "YYYYMMDD");

  citySrc = getIATACode(src);
  cityDst = getIATACode(dst);

  scrape(citySrc, cityDst, from.format("YYYY-MM-DD"), to.format("YYYY-MM-DD"), (list) => {
    return res.status(200).send({
      success: 'true',
      message: "{0}".format(JSON.stringify(list)),  
    });
  });

});


app.listen(PORT, () => {
 console.log("Server running on port 3000");
});