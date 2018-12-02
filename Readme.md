I build this mockup to monitoring the price of the flight on Ryanair website, using puppetter.
Based on docker custom machine, is it possbile to print the price for a specific departure and destination.

#Build docker nodejs
```
docker build -t nodejs .

```

#Execute
Then run the following command to run the container and execute the search
```
docker run -v $(pwd)/:/home/ nodejs node /home/main.js -f DUB -t BGY -s 2018-12-07 -e 2018-12-09
```

#Documentation:
```
-f (--from): departure airport code (i.e. DUB, BGY)
-t (--to): destination airport code (i.e. DUB, BGY)
-s (--start-date): departure date format yyyy-mm-dd (i.e. 2018-12-07)
-e (--end-date): return date format yyyy-mm-dd (i.e. 2018-12-09)
```
