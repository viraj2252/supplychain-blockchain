'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/supplyController');


    // todoList Routes
    app.route('/')
        .get(todoList.list_all_warrants)
        .post(todoList.create_warrant);

    app.route('/:warrantId')
        .get(todoList.get_a_warant)
        .delete(todoList.delete_a_warrant);
};