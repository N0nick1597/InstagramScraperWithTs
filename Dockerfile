FROM node:14

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install -g nodemon
RUN npm install

COPY . /usr/src/app/