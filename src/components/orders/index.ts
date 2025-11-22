import { NextFunction, Request, Response } from 'express';
import OrderService from './service';
import { HttpError } from '../../config/error';
import * as XLSX from "xlsx";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */


export async function get(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const { limit, offset, plataforma, id_venta, startDate, endDate }: any = req.body
        const [orders, total]  = await OrderService.getData(limit, offset, plataforma ? plataforma : '', id_venta ? id_venta : '', startDate ? startDate : '', endDate ? endDate : '');
        
        res.status(200).json({
            message: "ok",
            orders,
            total
        });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function exportData(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { limit, offset, plataforma, id_venta, startDate, endDate }: any = req.body;
        
        const [orders, total] = await OrderService.getData(limit, offset, plataforma ? plataforma : '', id_venta ? id_venta : '', startDate ? startDate : '', endDate ? endDate : '');

        const worksheet = XLSX.utils.json_to_sheet(orders);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders Data");

        const fileBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

        res.setHeader('Content-Disposition', 'attachment; filename=orders_data.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    
        res.status(200).send(fileBuffer);

    } catch (error) {
        console.error("Error exporting data:", error);
        res.status(500).json({ message: "Error generating the Excel file.", error: error.message });
    }
}
