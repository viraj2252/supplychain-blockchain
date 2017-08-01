// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'
//import express from "express";
import warrent_artifact from '../../build/contracts/Warrant.json'
//var express = require('express');


var Warrant = contract(warrent_artifact);

window.splitContract = function(candidate) {
    debugger;
    var myContract = web3.eth.contract(Warrant.abi).at('0xe30a0ea91ce18287a412dc27e662682b968f6d4a');
    myContract.setState.call(1).then(function(v) {
        debugger;
    });
    var contractInstance = MyContract.new('p1', 6000, 'mT', { gas: 1000000 });

};

$(document).ready(function() {
    //debugger;

    if (typeof Web3 !== 'undefined') {
        console.warn("Using web3 detected from external source like Metamask");
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }



    Warrant.setProvider(web3.currentProvider);

    var myContract = web3.eth.contract(Warrant.abi).at('0xe30a0ea91ce18287a412dc27e662682b968f6d4a');

    Warrant.deployed().then(function(contractInstance) {
        contractInstance.PbNumbers().then(function(val) {
            debugger;
            $('#pb').html(val);
        });
        contractInstance.unit().then(function(val) {
            $('#unit').html(val);
        });
        contractInstance.totalVolume().then(function(val) {
            $('#totVol').html(val.c[0]);
        });
        contractInstance.state().then(function(val) {
            $('#tState').html(val.c[0]);
        });
    });
});