const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const routes = require('./routes');
const path = require('path');

dotenv.config();

const init = async ()=>{
    const server = Hapi.server({
        port: 9000,
        host: '0.0.0.0',
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'views'),
            }
        }
    })

    await server.register([
        {
            plugin: require('@hapi/inert'),
        },
        {
            plugin: require('@hapi/vision'),
        }
    ])
    
    server.views({
        engines: {
            ejs: require('ejs'),
        },
        relativeTo: path.join(__dirname, 'views'),
    })

    server.ext('onPreResponse',(request, h)=>{
        const response = request.response;

        if(response instanceof Error){
            const newResponse = h.response({
                status: 'fail',
                message: 'Returned an Error!',
                error: response.stack,
            })

            newResponse.code(500);
            return newResponse;
        }

        return h.continue;
    })

    server.route(routes);

    await server.start();
    console.log(`Server started at ${server.info.uri}`);
}

process.on('unhandledRejection', (error) =>{
    console.error(error.stack);
    console.error(`Process caugh Error!`);
    process.exit(1);
})

init();