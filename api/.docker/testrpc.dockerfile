FROM node:6.9

MAINTAINER Viraj Kothalawala

RUN npm install -g ethereumjs-testrpc

EXPOSE 8545

ENTRYPOINT [ "testrpc" ]