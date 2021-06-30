import { Express, Request, Response } from 'express';

const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');
const shoppingRoutes = require('./shopping.routes');
const productRoutes = require('./product.routes');

export default function(app: Express) {

    // This one is just a test
    app.get('/', (req: Request, res: Response) => {
        res.status(200).send("Hello from API [DEV]");
    });

    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/sessions', sessionRoutes);
    app.use('/api/v1/shopping', shoppingRoutes);
    app.use('/api/v1/products', productRoutes);
}