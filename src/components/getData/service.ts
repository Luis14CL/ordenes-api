import { IDataModel } from './dataModel';
import { IInsertService } from './interface';
import axios from 'axios';

/**
 * @export
 * 
 * @implements {IInsertService}
 */
const InsertService: IInsertService = {

    async getData(limit:number, offset:number, token: string): Promise < [IDataModel] > {
        try {
            
            const url: string =`https://pruebas-api-l4yu.onrender.com/api/orders?limit=${limit}&offset=${offset}`;

            const config = {
            headers: { Authorization: `Bearer ${token}` }
            };
            
            
            const orders = await axios.get(url, config);
            console.log('Órdenes:', orders.data);
            if(orders){
                const data: [IDataModel] = (await orders).data.data
                return data
            }

        } catch (error) {
            throw new Error(error.message);
        }
    },

    
    async getToken(autenticacion:string): Promise < string > {
        try {
              const response = await axios.post(
                'https://pruebas-api-l4yu.onrender.com/api/auth/token',
                {},
                {
                auth: {
                    username: 'api_client',
                    password: 'SecurePass2024!'
                }
                }
            );
            const token = response.data.data.access_token;
            console.log('Token:', token);

            return token;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default InsertService;
