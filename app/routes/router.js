'use strict';

const fs = require('fs'),
    path = require('path'),
    WarrantsController = require('../controllers/warrants.controller'),
    AccountsController = require('../controllers/accounts.controller');

var routes = function() {

    var startFolder = null,

        //Called once during initial server startup
        load = function(express, routerV1) {
            var warrenApiV1 = express.Router();
            routerV1.use('/warrant', warrenApiV1);
            let wc = new WarrantsController(warrenApiV1);

            var accountApiV1 = express.Router();
            routerV1.use('/accounts', accountApiV1);
            let ac = new AccountsController(accountApiV1);
        };

    return {
        load: load
    };

}();

module.exports = routes;