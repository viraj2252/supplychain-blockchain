const warrantService = require('../services/warrantService'),
    logger = require('../../utils/logger');

class warrantsController {

    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get(`/`, this.getWarrants.bind(this));
        this.router.get(`/:contractaddress`, this.getWarrantByAddress.bind(this));
    }

    getWarrants(req, res) {
        warrantService.createContract();
        res.send('hi');
    }

    getWarrantByAddress(req, res) {
        warrantService.getContractsByAccount(null, null, req.params.contractaddress);
    }
}

module.exports = warrantsController;