var Jade = require('jade');
var Path = require('path');

var internals = {};


exports.register = function (server, options, next) {

    // Registration logic in internals.after will execute on
    // server start only after dependencies are fully registered.
    server.dependency(['vision', 'inert'], internals.after);

    next();
};

internals.after = function (server, next) {

    server.views({
        engines: {
            jade: require('jade')
        },
        path: '../../views',
        partialsPath: '../../views/partials',
        relativeTo: __dirname
    });

    server.route({
        method: 'GET',
        path: '/public/{path*}',
        config: {
            handler: {
                directory: {
                    path: Path.join(__dirname, '../..', 'public'),
                    index: false,
                    redirectToSlash: false
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        config: {
            description: 'sofajs docserver homepage'
        },
        handler: function (request, reply) {

            return reply.view('sofajs', { docs: server.app.sofaDocs } );
        }
    });

    server.route({
        method: 'GET',
        path: '/foundation',
        config: {
            description: 'sofajs foundation documentation'
        },
        handler: function (request, reply) {

            return reply.view('foundation', { docs: server.app.sofaDocs } );
        }
    });

    server.route({
        method: 'GET',
        path: '/sofajs',
        config: {
            description: 'sofajs docserver homepage'
        },
        handler: function (request, reply) {

            return reply.view('sofajs', { docs: server.app.sofaDocs } );
        }
    });

    server.route({
        method: 'GET',
        path: '/jade',
        config: {
            description: 'process some Jade'
        },
        handler: function (request, reply) {

            /*
            {
                filename:string
                doctype:string
                self:boolean
                cache:boolean
                compiler:class
                parser:class
                globals:Array
            }
            */

            // Compile a function
            var fn = Jade.compile('h1 string of #{locals.one} jade');
            
            // Render the function
            var locals = { one: 'hapi sofajs' };
            var html = fn(locals);
            // => '<string>of jade</string>'

            return reply(html);
        }
    });

    next();
};

exports.register.attributes = {
        name: 'Home'
    };

