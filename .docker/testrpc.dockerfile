FROM harshjv/testrpc

LABEL maintainer="virajkothalawala@steinweg.com"

EXPOSE 8545

ENTRYPOINT [ "testrpc" ]