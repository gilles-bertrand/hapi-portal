const Glue = require('glue');
const routes = require('hapi-routes-plugin');
const models = require('hapi-moongoose-models-plugin');
const hapiDevErrors = require('hapi-dev-errors');
const authStrategy = require(`${process.cwd()}/plugins/auth-strategy`);
require('dotenv').config({ path: 'secrets.env' });
const manifest = {
    server: {
        port: process.env.PORT || 8001
    },
    register: {
        plugins: [
            { plugin: hapiDevErrors, options: { showErrors: process.env.NODE_ENV !== 'production', useYouch: true } },
            authStrategy,
            { plugin: models, options: { database: process.env.DATABASE } },
            routes
        ]
    }
};

const startServer = async () => {
    try {
        const server = await Glue.compose(manifest);
        await server.start();
        console.log('Server started at: ' + server.info.uri);
    }
    catch (err) {
        console.log('There was an error')
        console.error(err);
        process.exit(1);
    }
};

startServer();