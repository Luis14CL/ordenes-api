import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import  InsertRouter from './insertRouter'
import OrderRouter from './orderRouter'

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();


    /**
     * @description
     *  Forwards any requests to the /models URI to our ModelRouter
     * @constructs
     */
        app.use('/insert', InsertRouter);


    
    /**
     * @description
     *  Forwards any requests to the /models URI to our ModelRouter
     * @constructs
     */
        app.use('/orders', OrderRouter);

    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @constructs all routes
     */
    app.use(router);
}
