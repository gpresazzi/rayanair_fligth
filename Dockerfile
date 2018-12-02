#specify the node base image with your desired version node:<version>
FROM node:latest
RUN apt update
RUN apt -y upgrade
RUN apt-get install -y build-essential libssl-dev libffi-dev python3-dev libx11-xcb1
RUN curl https://bootstrap.pypa.io/get-pip.py > /tmp/get-pip.py
RUN python3 /tmp/get-pip.py
RUN pip3 install awscli
RUN npm i puppeteer
RUN apt-get install -y libxtst6 gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
				libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
				libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
				libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
				fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

RUN npm i commander

# replace this with your application's default port
EXPOSE 8888
