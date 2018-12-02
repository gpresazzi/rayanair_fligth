I build this mockup to monitoring the price of the flight on Ryanair website, using puppetter.

Build docker nodejs

```
docker build -t nodejs .

```

Then run the following command to run the container and execute the search
```
docker run -v $(pwd)/:/home/ nodejs node /home/main.js -f DUB -t BGY -s 2018-12-07 -e 2018-12-09
```

