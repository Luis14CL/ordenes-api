import { IOrderModelService } from './interface';
import { pool } from '../../config/env'

/**
 * @export
 * 
 * @implements {IOrderModelService}
 */
const InsertService: IOrderModelService = {

    async getData(limit:number, offset:number, plataforma: string, id_venta: string, startDate: Date, endDate: Date): Promise < [any[], number] > {
        try {
            const filtros: string[] = [];

            if (plataforma) filtros.push(`o.plataforma = '${plataforma}'`);
            if (id_venta) filtros.push(`o.id_venta = '${id_venta}'`);
            if (startDate) filtros.push(`o.fecha >= '${startDate}'`);
            if (endDate) filtros.push(`o.fecha <= '${endDate}'`);

            const where = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';
            const query = 
            `SELECT 
            o.id_venta,
            o.fecha,
            o.plataforma,
            o.total,
            o.estado,
            jsonb_build_object(
                'id_detalle', d.id_detalle,
                'sku', d.sku,
                'cantidad', d.cantidad,
                'precio_unitario', d.precio_unitario,
                'subtotal', d.subtotal,
                'producto', d.producto
            ) AS detalle
            FROM orders.orders o 
            INNER JOIN orders.detalle d ON o.detalle = d.id_detalle
            ${where}
            ORDER BY o.id_venta DESC
            LIMIT ${limit}
            OFFSET ${offset};`;
            const response = await pool.query(query);

            const totalQuery = `SELECT 
                COUNT(*) AS total_registros
            FROM orders.orders o
            INNER JOIN orders.detalle d ON o.detalle = d.id_detalle
            ${where};`

            
            const totalResponse = await pool.query(totalQuery);

            return [response.rows, totalResponse.rows[0].total_registros]

        } catch (error) {
            throw new Error(error.message);
        }
    },

};

export default InsertService;
