/**
 * @export
 * @interface IInsertService
 */
export interface IInsertService {

    insert(limit:number, offset: number): Promise<String>;

}