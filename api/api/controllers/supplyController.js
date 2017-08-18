'use strict';


var Web3 = require('web3');
var async = require("async");
const NodeCache = require("node-cache");
//const TestRPC = require("ethereumjs-testrpc");
var Contract = require('truffle-contract');
var WarrentArtifact = require('../../contracts/Warrant.json');
const web3 = new Web3('http://vjtestrpc:8545');
web3.setProvider(new web3.providers.HttpProvider("http://vjtestrpc:8545"));
var defAccount = '';

const myCache = new NodeCache();

web3.eth.getAccounts(function(error, result) {
    defAccount = result[0];
});

function getContracts(contractAddress, callback) {
    console.log('contract address ' + contractAddress);
    var myContract = web3.eth.contract(WarrentArtifact.abi);
    var myContractInstance = myContract.at(contractAddress);

    myContractInstance.readContract.call(function(err, result) {
        console.log('contract data ' + result);
        var newRes = {};
        newRes.totvol = result[0];
        newRes.pbsNumbers = result[1];
        newRes.contractId = contractAddress;
        callback(null, newRes);
    });
};

exports.list_all_warrants = function(req, res) {

    var contract = new Contract(WarrentArtifact);

    web3.eth.getAccounts(function(error, result) {
        defAccount = result[1];

        web3.eth.defaultAccount = defAccount;
        console.log(web3.eth.accounts[0]);
        //web3.eth.personal.unlockAccount(web3.eth.defaultAccount, "password", 15000);
        try {
            var contractKeys = myCache.get("contract-keys", true);
            var contractDatas = [];

            if (contractKeys) {
                async.map(contractKeys, getContracts, function(err, results) {
                    // results is now an array of stats for each file
                    console.log('got results');
                    res.json(results);
                });

                //res.end();
                return;
            }
        } catch (err) {
            res.status(400).send({ error: 'No contract available yet' });
        }

        // myContract.methods.readContract().call()
        //     .then(res.json);
        //res.json('hi');
    });

};

exports.get_a_warant = function(req, res) {
    var contract = new Contract(WarrentArtifact);

    web3.eth.getAccounts(function(error, result) {
        defAccount = result[1];
        console.log('got results ' + req.params.warrantId);

        async.map([req.params.warrantId], getContracts, function(err, results) {
            // results is now an array of stats for each file
            console.log('got results ');
            res.json(results);
        });
    });

};

exports.delete_a_warrant = function(req, res) {
    var contract = new Contract(WarrentArtifact);

    web3.eth.getAccounts(function(error, result) {
        defAccount = result[1];
        console.log('deletinf contract ' + req.params.warrantId);

        var myContract = new web3.eth.Contract(WarrentArtifact.abi, req.params.warrantId);

        myContract.methods.kill().call().then(function(result) {
            console.log('contract data deleted' + result);
            res.json({ message: 'Contract deleted' });
        });
    });

}

exports.create_warrant = function(req, res) {
    //web3.personal.unlockAccount(defAccount, "password", 15000);
    //console.log('in POST ' + web3.personal + ' ' + web3.eth.defaultAccount);
    //create a json response
    var requestAsJson = JSON.stringify(req.body);

    console.log(req.body);
    if (req.body === 2) {
        res.status(400).send({ error: 'No form data defined' });
        return;
    }

    var ctr = web3.eth.contract(WarrentArtifact.abi);
    var contractInstance = ctr.new(123, 'pb1', { data: WarrentArtifact.unlinked_binary, from: defAccount, gas: 1000000 }, function(e, contract) {
        //console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
            console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            try {
                console.log('saving to memcache');
                var contractKeys = myCache.get("contract-keys", true);

                if (contractKeys) {
                    console.log('cache values ' + contractKeys);
                    contractKeys.push(contract.address);
                    myCache.set("contract-keys", contractKeys);
                }
            } catch (err) {
                console.log('saving to memcache error ' + err);
                var contractKeys = [contract.address];
                myCache.set("contract-keys", contractKeys);
            }
            res.json(contract.address.toString());
        }


    });

    // ctr.options.gasPrice = '20000000000000';
    // ctr.deploy({
    //         data: WarrentArtifact.unlinked_binary,
    //         arguments: [123, 'pb1']
    //     })
    //     .send({
    //         from: defAccount,
    //         gas: 1000000,
    //         gasPrice: '40000000000'
    //     }, function(error, transactionHash) { console.log('hash is ' + transactionHash); })
    //     .on('error', function(error) { console.log(error); })
    //     .on('transactionHash', function(transactionHash) {})
    //     .on('receipt', function(receipt) {
    //         console.log(receipt.contractAddress) // contains the new contract address
    //     })
    //     .on('confirmation', function(confirmationNumber, receipt) {})
    //     .then(function(newContractInstance) {
    //         console.log(newContractInstance.options.address) // instance with the new contract address

    //         //Add to mem cache
    //         try {
    //             console.log('saving to memcache');
    //             var contractKeys = myCache.get("contract-keys", true);

    //             if (contractKeys) {
    //                 console.log('cache values ' + contractKeys);
    //                 contractKeys.push(newContractInstance.options.address);
    //                 myCache.set("contract-keys", contractKeys);
    //             }
    //         } catch (err) {
    //             console.log('saving to memcache error ' + err);
    //             var contractKeys = [newContractInstance.options.address];
    //             myCache.set("contract-keys", contractKeys);
    //         }
    //         res.json(newContractInstance.options.address);
    //     });

};