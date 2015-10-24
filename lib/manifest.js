
var composer = module.exports = {};

composer.manifest = {
    connections: [
        {
            host: 'localhost',
            port: 9000,
            labels: ['web', 'api']
        }],
    plugins: {
        './web/docs': [{
            'select': ['web']
        }],
        './api/api': [{
            'select': ['api']
        }],
        'vision': {},
        'inert': {}
    }
};

composer.composeOptions = {
    relativeTo: __dirname
};

