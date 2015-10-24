var Path = require('path');

var internals = {};


exports.register = function (server, options, next) {

    // Registration logic in internals.after will execute on
    // server start only after dependencies are fully registered.
    // server.dependency(['vision', 'inert'], internals.after);

    internals.after(server, next);

    // next();
};


internals.after = function (server, next) {

    server.route({
        method: 'GET',
        path: '/docs',
        config: {
            description: 'serve sofajs JSON object'
        },
        handler: function (request, reply) {

            return reply({ docs: server.app.sofaDocs });
        }
    });

    next();
};

exports.register.attributes = {
        name: 'Api'
};
