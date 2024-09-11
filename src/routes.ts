// src/routes.ts

import { Server } from '@hapi/hapi';
import {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
} from './controllers/itemController';

export const defineRoutes = (server: Server) => {
    // Ruta de Ping
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return { ok: true };
        }
    });

    server.route({
        method: 'GET',
        path: '/items',
        handler: getAllItems
    });

    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: getItemById
    });

    server.route({
        method: 'POST',
        path: '/items',
        handler: createItem
    });

    server.route({
        method: 'PUT',
        path: '/items/{id}',
        handler: updateItem
    });

    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: deleteItem
    });
};