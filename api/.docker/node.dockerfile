FROM node:latest

MAINTAINER Viraj Kothalawala

ENV PORT=3000

COPY . /var/www/api
WORKDIR /var/www/api



RUN npm install
RUN npm install truffle -g
RUN npm install truffle-contract -g


EXPOSE $PORT

ENTRYPOINT ["node", "server.js"]
