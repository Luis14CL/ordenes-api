import { NextFunction, Request, Response } from 'express';
import InsertService from './service';
import { HttpError } from '../../config/error';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function insert(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const { limit, offset }: any = req.body
        const models  = await InsertService.insert(limit, offset);

        res.status(200).json({"message": "ok"});
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}