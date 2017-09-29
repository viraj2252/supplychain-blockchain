// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
    networks: {
        development: {
            host: '13.228.219.93',
            port: 8000,
            network_id: '2252' // Match any network id
        }
    }
}