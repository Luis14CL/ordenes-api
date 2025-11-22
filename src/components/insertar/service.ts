import Joi from 'joi';
import { IInsertService } from './interface';
import InsertValidation from './validation';
import getDataService from '../getData/service';
import { IDataModel } from '../getData/dataModel';
import { pool } from '../../config/env'
/**
 * @export
 * 
 * @implements {IInsertService}
 */
const InsertService: IInsertService = {
    /**
     * @param {number} greater
     * @param {number} lower
     * @returns {Promise < String >}
     * @memberof InsertService
     */
    async insert(limit:number, offset:number): Promise < String > {
        try {
             const validate: Joi.ValidationResult = InsertValidation.insert({limit, offset});
            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const token = await getDataService.getToken("YXBpX2NsaWVudDpTZWN1cmVQYXNzMjAyNCE=")
            console.log(token);
            setTimeout(()=>{

            }, 1500)
            const data:[IDataModel]  = await getDataService.getData(limit, offset, token);

            data.forEach(async item=>{
                const queryOrders = `INSERT INTO orders.orders(id_venta, fecha, plataforma, total, estado, detalle)
                VALUES ('${item.id_venta}', '${item.fecha}', '${item.plataforma}', '${item.total}', '${item.estado}', '${item.detalle[0].id_detalle}')`;
                console.log(queryOrders)
                const queryDetalle = `INSERT INTO orders.detalle(id_detalle, sku, cantidad, precio_unitario, subtotal, producto) 
                VALUES ('${item.detalle[0].id_detalle}', '${item.detalle[0].sku}', ${item.detalle[0].cantidad}, '${item.detalle[0].precio_unitario}', ${item.detalle[0].subtotal}, '0')`;
                
                await pool.query(queryDetalle);
                await pool.query(queryOrders);
            })
            
            return "success"
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default InsertService;
