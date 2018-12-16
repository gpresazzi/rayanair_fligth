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
docker run -v $(pwd)/:/home/ nodejs node /home/src/main.js -f DUB -t BGY -s 2019-01-07 -e 2019-01-07
```

# Web API
**Do you need a web API ? Here we are !**

If you want to run the server and use REST API 

`docker run -v $(pwd)/:/home/ -p 8080:3000 -d nodejs node /home/src/web.js`

### Easy way
You don't need to specify the dates if you are used to book flight during the weekend. This API will select the starting date on Friday and the arrival Date on Sunday.

`curl http://localhost:3000/api/v1/flight/DUB/BGY`

### Do you prefere to specify your start and arrival date ?
The weekend date are not ok for you ? you can select custom date 

`curl http://localhost:3000/api/v1/flight/DUB/BGY/20191010/20191013`


#Documentation:
```
-f (--from): departure airport code (i.e. DUB, BGY)
-t (--to): destination airport code (i.e. DUB, BGY)
-s (--start-date): departure date format yyyy-mm-dd (i.e. 2018-12-07)
-e (--end-date): return date format yyyy-mm-dd (i.e. 2018-12-09)
```
