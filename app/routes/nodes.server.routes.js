var nodes = require('../../app/controllers/nodes.server.controller'),
    passport = require('passport');

module.exports = function(app) {
//    app.route('/users')
//        .post(users.create)
//        .get(users.list);
//    
//    app.route('/users/:userId')
//        .get(users.read)
//        .put(users.update)
//        .delete(users.delete);
//    
//    app.param('userId', users.userByID);
    
    app.route('/api/nodes')
        .get(nodes.getNodes)
        .post(nodes.createNode);
    

    
};