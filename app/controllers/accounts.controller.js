'use strict'

const accountService = require('../services/accountsService'),
    logger = require('../../utils/logger');

class accountsController {

    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    /**
     * Register routes related to accounts
     */
    registerRoutes() {
        this.router.get(`/`, this.getAllAccounts.bind(this));
    }

    /**
     * Get all ethereum accounts available in hosted node
     */
    getAllAccounts(req, res) {
        logger.info('getAllAccountsCalled');
        accountService.getAllAccounts()
            .then((accounts) => {
                res.send(accounts);
            })
            .catch((e) => {
                logger.error(e);
                throw e;
            })
    }
}

module.exports = accountsController;