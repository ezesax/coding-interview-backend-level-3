import { Request, ResponseToolkit } from '@hapi/hapi';
import { Item } from '../models/Item';

export const getAllItems = async (request: Request, h: ResponseToolkit) => {
    try {
        const items = await Item.findAll();
        return h.response(items).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Error al obtener los items' }).code(500);
    }
};

export const getItemById = async (request: Request, h: ResponseToolkit) => {
    const id = request.params.id;
    try {
        const item = await Item.findByPk(id);
        if (item) {
            return h.response(item).code(200);
        }
        return h.response({ error: 'Item no encontrado' }).code(404);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Error al obtener el item' }).code(500);
    }
};

export const createItem = async (request: Request, h: ResponseToolkit) => {
    const { name, price } = request.payload as { name: string; price: number };

    const errors = [];
    if (price === undefined) {
        errors.push({ field: 'price', message: 'Field "price" is required' });
    } else if (price < 0) {
        errors.push({ field: 'price', message: 'Field "price" cannot be negative' });
    }

    if (!name) {
        errors.push({ field: 'name', message: 'Field "name" is required' });
    }

    if (errors.length > 0) {
        return h.response({ errors }).code(400);
    }

    try {
        const newItem = await Item.create({ name, price });
        return h.response(newItem).code(201);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Error al crear el item' }).code(500);
    }
};

export const updateItem = async (request: Request, h: ResponseToolkit) => {
    const id = request.params.id;
    const { name, price } = request.payload as { name: string; price: number };

    const errors = [];
    if (price === undefined) {
        errors.push({ field: 'price', message: 'Field "price" is required' });
    } else if (price < 0) {
        errors.push({ field: 'price', message: 'Field "price" cannot be negative' });
    }

    if (!name) {
        errors.push({ field: 'name', message: 'Field "name" is required' });
    }

    if (errors.length > 0) {
        return h.response({ errors }).code(400);
    }

    try {
        const item = await Item.findByPk(id);
        if (item) {
            item.name = name;
            item.price = price;
            await item.save();
            return h.response(item).code(200);
        }
        return h.response({ error: 'Item no encontrado' }).code(404);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Error al actualizar el item' }).code(500);
    }
};

export const deleteItem = async (request: Request, h: ResponseToolkit) => {
    const id = request.params.id;
    try {
        const item = await Item.findByPk(id);
        if (item) {
            await item.destroy();
            return h.response().code(204);
        }
        return h.response({ error: 'Item no encontrado' }).code(404);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Error al eliminar el item' }).code(500);
    }
};
