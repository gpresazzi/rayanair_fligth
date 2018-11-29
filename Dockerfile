#specify the node base image with your desired version node:<version>
FROM node:6
RUN apt-get install python3-dev
RUN curl https://bootstrap.pypa.io/get-pip.py | python3
RUN pip3 install awscli
# replace this with your application's default port
EXPOSE 8888
