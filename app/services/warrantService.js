'use strict'

const WarrentArtifact = require('../../build/contracts/Warrant.json'),
    Web3 = require('web3'),
    logger = require('../../utils/logger'),
    siteConfig = require("../../config/siteConfig"),
    contract = require('truffle-contract');

//import { default as contract } from 'truffle-contract';
//import warrant_artifacts from '../.. / build / contracts / Warrant.json ';


class WarrantService {
    constructor() {}

    createContract(host, port, address) {
        if (!host || !port) {
            logger.info('Host or post is missing. Will fallback to default configuraton');
            host = siteConfig.defaultBlockchainHost;
            port = siteConfig.defaultBlockchainPort;

            if (!host.startsWith('http'))
                host = `http://${host}`; //Change later based on SSL
        }

        const web3 = new Web3(`${host}:${port}`);
        web3.setProvider(new web3.providers.HttpProvider(`${host}:${port}`));
        var warrantcontract = web3.eth.contract(WarrentArtifact.abi);

        var contractInstance = warrantcontract.new(123, 'pb1', { data: WarrentArtifact.unlinked_binary, from: web3.eth.coinbase, gas: 1000000 }, function(e, contract) {
            if (typeof contract.address !== 'undefined') {
                logger.info('Warrent created: ' + contract.address);
            }
        });
    }

    /**
     * Get all deployed contracts by the user address.
     * Address will first check against the host provided.
     * If there is no registered address available, an error will be thrown
     * @param {*} host - IP address of the node.
     * @param {*} port - RPC port of the node.
     * @param {*} address - valid ethereum address to request for contracts.
     */
    getContractsByAccount(host, port, address) {
        if (!host || !port) {
            logger.info('Host or post is missing. Will fallback to default configuraton');
            host = siteConfig.defaultBlockchainHost;
            port = siteConfig.defaultBlockchainPort;

            if (!host.startsWith('http'))
                host = `http://${host}`; //Change later based on SSL
        }

        try {
            const web3 = new Web3(`${host}:${port}`);
            web3.setProvider(new web3.providers.HttpProvider(`${host}:${port}`));
            // var ctr = web3.eth.contract(WarrentArtifact.abi);
            // var ctrAt = ctr.at(address);

            var filter = web3.eth.filter({ fromBlock: 0, toBlock: 'latest', address: address });
            filter.watch(function(error, result) {
                if (!error) logger.info(result);
            })

        } catch (e) {
            logger.error(e, e.stack);
            throw e;
        }
    }
}

module.exports = new WarrantService();