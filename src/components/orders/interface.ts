import { IDataModel } from "../getData/dataModel";

/**
 * @export
 * @interface IOrderModelService
 */
export interface IOrderModelService {

    getData(limit:number, offset: number, plataforma: string, id_venta: string, startDate: Date, endDate: Date): Promise<[any[], number]>;

}