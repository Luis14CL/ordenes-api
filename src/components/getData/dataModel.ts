export interface IDataModel{
    id_venta: string,
    fecha: Date,
    plataforma: string,
    total: string,
    estado: string,
    detalle: [
        {
            id_detalle: string,
            sku: string,
            cantidad: number,
            precio_unitario: string,
            subtotal: number,
            producto: {}
        }
    ]
}