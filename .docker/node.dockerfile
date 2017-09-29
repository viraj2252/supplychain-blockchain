FROM node:latest

LABEL maintainer="virajkothalawala@steinweg.com"

ENV PORT=3000

COPY . /var/www/blockchain
WORKDIR /var/www/blockchain



RUN npm install
RUN npm install truffle -g
RUN npm install truffle-contract -g


EXPOSE $PORT

ENTRYPOINT ["node", "server.js"]
