import Hapi from '@hapi/hapi'
import { defineRoutes } from './routes'
import sequelize from './config/database';

const getServer = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
    })

    sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

    defineRoutes(server)

    return server
}

export const initializeServer = async () => {
    const server = await getServer()
    await server.initialize()
    return server
}

export const startServer = async () => {
    const server = await getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
};