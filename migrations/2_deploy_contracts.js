var Warrant = artifacts.require("./Warrant.sol");

module.exports = function(deployer) {
    deployer.deploy(Warrant, 120, { gas: 1000000 });
};