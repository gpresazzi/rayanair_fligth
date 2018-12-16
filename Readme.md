I build this mockup to monitoring the price of the flight on Ryanair website, using [*puppeteer*](https://github.com/GoogleChrome/puppeteer).
Based on docker custom machine, is it possbile to print the price for a specific departure and destination.

# Build docker nodejs
```
docker build -t nodejs .
```

# Command line
Execute script to retrieve flight by console
Then run the following command to run the container and execute the search
```
docker run -v $(pwd)/:/home/ nodejs node /home/src/main.js -f <IATA_SRC> -t <IATA_DST> -s <DEPARTURE_DATE> -e <RETURN_DATE>
```

## Documentation:
```
-f (--from): departure airport IATA code  (i.e. DUB, BGY, STN ...)
-t (--to): destination airport IATA code  (i.e. DUB, BGY, STN ...)
-s (--start-date): departure date format yyyy-mm-dd (i.e. 2018-12-07)
-e (--end-date): return date format yyyy-mm-dd (i.e. 2018-12-09)
```

Example: 

`docker run -v $(pwd)/:/home/ nodejs node /home/src/main.js -f DUB -t BGY -s 2019-01-07 -e 2019-01-07`

Output sample
```
Sat Dec 15 2018 22:10:00 GMT+0000 (GMT) https://www.ryanair.com/it/en/booking/home/DUB/LGW/2019-01-07/2019-01-07/1/0/0/0
Sat Dec 15 2018 22:10:07 GMT+0000 (GMT) Download complete, waiting some seconds more ...
Found 16 trips
{"id":"id_1","departure":"Dublino","destination":"Londra (Gatwick)","startTime":"06:30","arrivalTime":"06:30","price":"17,99 €","discounted":false}
{"id":"id_1","departure":"Dublino","destination":"Londra (Gatwick)","startTime":"07:30","arrivalTime":"07:30","price":"27,53 €","discounted":false}
...
```

# Web API
**Do you need a web API ? Here we are !**

If you want to run the server and use REST API 

`docker run -v $(pwd)/:/home/ -p 8080:3000 -d nodejs node /home/src/web.js`

### Easy way
You don't need to specify the dates if you are used to book flight during the weekend. This API will select the starting date on Friday and the arrival Date on Sunday.

`curl http://localhost:8080/api/v1/flight/DUB/STN`

### Do you prefere to specify your start and arrival date ?
The weekend date are not ok for you ? you can select custom date 

`curl http://localhost:8080/api/v1/flight/DUB/STN/20190110/20190113`

