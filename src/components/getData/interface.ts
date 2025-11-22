import { IDataModel } from "./dataModel";

/**
 * @export
 * @interface IInsertService
 */
export interface IInsertService {

    getData(limit:number, offset: number, token: string): Promise<[IDataModel]>;

    getToken(autenticacion: string): Promise<string>;

}