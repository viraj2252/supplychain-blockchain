'use strict'

const Web3 = require('web3'),
    logger = require('../../utils/logger'),
    siteConfig = require("../../config/siteConfig");

class AccountsService {
    constructor() {}

    /**
     * Get all ether addresses in a node.
     * if host or port is not provided, system wiol falldown to default
     * @param {string} host - AP address of the node to connect to. Make sure RPC is enabled
     * @param {number} port - Port of the RPC to connect to
     */
    getAllAccounts(host, port) {
        if (!host || !port) {
            logger.info('Host or post is missing. Will fallback to default configuraton');
            host = siteConfig.defaultBlockchainHost;
            port = siteConfig.defaultBlockchainPort;

            if (!host.startsWith('http'))
                host = `http://${host}`; //Change later based on SSL
        }

        //connect to blockchain through web3
        const web3 = new Web3(`${host}:${port}`);
        web3.setProvider(new web3.providers.HttpProvider(`${host}:${port}`));

        return new Promise((resolve, reject) => {
            web3.eth.getAccounts(function(error, result) {
                if (error) {
                    logger.error(error);
                    reject(new Error('No account available ' + error));
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Create a new user accout in private blockchain for customes to assign and create warrants
     * @param {*} host - ip address of the node to conenct to
     * @param {*} port - port of the node to connect to
     * @param {*} password  - password of the account.
     */
    createAccount(host, port, password) {
        if (!host || !port) {
            logger.info('Host or post is missing. Will fallback to default configuraton');
            host = siteConfig.defaultBlockchainHost;
            port = siteConfig.defaultBlockchainPort;

            if (!host.startsWith('http'))
                host = `http://${host}`; //Change later based on SSL
        }

        //connect to blockchain through web3
        const web3 = new Web3(`${host}:${port}`);
        web3.setProvider(new web3.providers.HttpProvider(`${host}:${port}`));

        return new Promise((resolve, reject) => {
            try {
                var result = web3.personal.newAccount(password);
                resolve(result);
            } catch (e) {
                reject(new Error(e));
            }
        });
    }
}

module.exports = new AccountsService();