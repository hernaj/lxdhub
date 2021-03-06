const { LXDHubAPI } = require('@lxdhub/api');
const { LXDHubWeb } = require('@lxdhub/web');
const lxd = require('./get-app-certs');
const express = require('express');

const port = parseInt(process.env.PORT, 10) || 3000;
const googleAnalytics = process.env.GOOGLE_ANALYTICS;
const hostUrl = process.env.HOST_URL || '0.0.0.0';
const logLevel = process.env.LOG_LEVEL;
const apiUrl = `/`;
const loggingUrl = `/api/v1/log`;

const database = {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'lxdhub',
    password: process.env.POSTGRES_PASSWORD || 'lxdhub',
    database: process.env.POSTGRES_DATABASE || 'lxdhub',
};

const startApiUi = async () => {
    let app;
    let server = express();
    app = await new LXDHubWeb({
        hostUrl,
        port,
        logLevel,
        loggingUrl,
        apiUrl,
        googleAnalytics,
    }, server).bootstrap();

    app = await new LXDHubAPI({
        hostUrl,
        port,
        logLevel,
        lxd,
        docUrl: '/api/v1/doc',
        database
    }, server).run();
    return app;
};

module.exports = startApiUi;
