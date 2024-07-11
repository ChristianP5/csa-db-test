const {
    getRootHandler, getLostHandler, getNewFormsHandler,
    postFormsHandler, getFormsHandler, getFormByIdHandler,
    getShowFormsHandler, getEditFormsHandler, putFormsHandler,
    getNewResponsePageHandler, postResponseHandler, getExportFormByIdHandler
} = require('./handler');

const path = require('path');

const routes = [
    {
        path: '/',
        method: 'GET',
        handler: getRootHandler,
    },
    // Creating Forms Page
    {
        path: '/forms/new',
        method: 'GET',
        handler: getNewFormsHandler,
    },
    // Showing Forms Page
    {
        path: '/forms/show/{id}',
        method: 'GET',
        handler: getShowFormsHandler,
    },
    // Edit Forms Page
    {
        path: '/forms/edit/{id}',
        method: 'GET',
        handler: getEditFormsHandler,
    },
    // Create Response Page
    {
        path: '/forms/{id}/response/new',
        method: 'GET',
        handler: getNewResponsePageHandler,
    },
    // Forms API
    {
        path: '/api/forms',
        method: 'POST',
        handler: postFormsHandler,
        options: {
            payload: {
                multipart: true,
                allow: 'multipart/form-data',
                maxBytes: 100000000,
            }
        }
    },
    {
        path: '/api/forms/{id}',
        method: 'PUT',
        handler: putFormsHandler,
        options: {
            payload: {
                multipart: true,
                allow: 'multipart/form-data',
                maxBytes: 100000000,
            }
        }
    },
    {
        path: '/api/forms',
        method: 'GET',
        handler: getFormsHandler,
    },
    {
        path: '/api/forms/{id}',
        method: 'GET',
        handler: getFormByIdHandler,
    },
    {
        path: '/api/responses',
        method: 'POST',
        handler: postResponseHandler,
        options: {
            payload: {
                multipart: true,
                allow: 'multipart/form-data',
                maxBytes: 100000000,
            }
        }
    },
    {
        path: '/api/forms/{id}/export',
        method: 'GET',
        handler: getExportFormByIdHandler,
    },
    {
        path: '/{filename*}',
        method: 'GET',
        handler: {
            directory: {
                path: path.join(__dirname, 'views'),
                index: ['index.ejs'],
            }
        },
    },
    {
        path: '/{any*}',
        method: '*',
        handler: getLostHandler,
    }
]

module.exports = routes