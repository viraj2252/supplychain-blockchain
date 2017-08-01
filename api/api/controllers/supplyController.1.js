// 'use strict';


// var Web3 = require('web3');
// var async = require("async");
// const NodeCache = require("node-cache");
// const TestRPC = require("ethereumjs-testrpc");
// var Contract = require('truffle-contract');
// var WarrentArtifact = require('../../../build/contracts/Warrant.json');
// const web3 = new Web3('http://localhost:8545');
// web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:8545"));
// var defAccount = '';

// const myCache = new NodeCache();

// web3.eth.getAccounts(function(error, result) {
//     defAccount = result[1];
// });

// function getContracts(contractAddress, callback) {
//     console.log('contract address ' + contractAddress);
//     var myContract = new web3.eth.Contract(WarrentArtifact.abi, contractAddress);

//     myContract.methods.readContract().call().then(function(result) {
//         console.log('contract data ' + result);
//         result.contractId = contractAddress;
//         callback(null, result);
//     });
// };

// exports.list_all_warrants = function(req, res) {

//     var contract = new Contract(WarrentArtifact);

//     web3.eth.getAccounts(function(error, result) {
//         defAccount = result[1];

//         web3.eth.defaultAccount = defAccount;
//         console.log(web3.eth.accounts[0]);
//         //web3.eth.personal.unlockAccount(web3.eth.defaultAccount, "password", 15000);
//         try {
//             var contractKeys = myCache.get("contract-keys", true);
//             var contractDatas = [];

//             if (contractKeys) {
//                 async.map(contractKeys, getContracts, function(err, results) {
//                     // results is now an array of stats for each file
//                     console.log('got results');
//                     res.json(results);
//                 });

//                 //res.end();
//                 return;
//             }
//         } catch (err) {
//             res.status(400).send({ error: 'No contract available yet' });
//         }

//         // myContract.methods.readContract().call()
//         //     .then(res.json);
//         //res.json('hi');
//     });

// };

// exports.get_a_warant = function(req, res) {
//     var contract = new Contract(WarrentArtifact);

//     web3.eth.getAccounts(function(error, result) {
//         defAccount = result[1];
//         console.log('got results ' + req.params.warrantId);

//         async.map([req.params.warrantId], getContracts, function(err, results) {
//             // results is now an array of stats for each file
//             console.log('got results ');
//             res.json(results);
//         });
//     });

// };

// exports.delete_a_warrant = function(req, res) {
//     var contract = new Contract(WarrentArtifact);

//     web3.eth.getAccounts(function(error, result) {
//         defAccount = result[1];
//         console.log('deletinf contract ' + req.params.warrantId);

//         var myContract = new web3.eth.Contract(WarrentArtifact.abi, req.params.warrantId);

//         myContract.methods.kill().call().then(function(result) {
//             console.log('contract data deleted' + result);
//             res.json({ message: 'Contract deleted' });
//         });
//     });

// }

// exports.create_warrant = function(req, res) {
//     console.log('in POST');
//     //create a json response
//     var requestAsJson = JSON.stringify(req.body);

//     console.log(req.body);
//     if (req.body === 2) {
//         res.status(400).send({ error: 'No form data defined' });
//         return;
//     }

//     var ctr = new web3.eth.Contract(WarrentArtifact.abi);
//     ctr.options.gasPrice = '20000000000000';
//     ctr.deploy({
//             data: WarrentArtifact.unlinked_binary,
//             arguments: [123, 'pb1']
//         })
//         .send({
//             from: defAccount,
//             gas: 1000000,
//             gasPrice: '40000000000'
//         }, function(error, transactionHash) { console.log('hash is ' + transactionHash); })
//         .on('error', function(error) { console.log(error); })
//         .on('transactionHash', function(transactionHash) {})
//         .on('receipt', function(receipt) {
//             console.log(receipt.contractAddress) // contains the new contract address
//         })
//         .on('confirmation', function(confirmationNumber, receipt) {})
//         .then(function(newContractInstance) {
//             console.log(newContractInstance.options.address) // instance with the new contract address

//             //Add to mem cache
//             try {
//                 console.log('saving to memcache');
//                 var contractKeys = myCache.get("contract-keys", true);

//                 if (contractKeys) {
//                     console.log('cache values ' + contractKeys);
//                     contractKeys.push(newContractInstance.options.address);
//                     myCache.set("contract-keys", contractKeys);
//                 }
//             } catch (err) {
//                 console.log('saving to memcache error ' + err);
//                 var contractKeys = [newContractInstance.options.address];
//                 myCache.set("contract-keys", contractKeys);
//             }
//             res.json(newContractInstance.options.address);
//         });

// };