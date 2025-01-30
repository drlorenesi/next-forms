import { type SalesData, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<SalesData[]> {
  // Normally, you'd fetch this data from an API
  return [
    {
      canal: "MAYOREO CAPITAL",
      total_ventas_siva: 1932683.71,
      total_nc_valor_siva: 79534.23,
      total: 1853149.48,
    },
    {
      canal: "RUTEO CAPITAL",
      total_ventas_siva: 1841103.66,
      total_nc_valor_siva: 201.79,
      total: 1840901.87,
    },
    {
      canal: "RUTEO ORIENTE",
      total_ventas_siva: 34079.37,
      total_nc_valor_siva: 0,
      total: 34079.37,
    },
    {
      canal: "MAYOREO OCCIDENTE",
      total_ventas_siva: 1666090.89,
      total_nc_valor_siva: 2825,
      total: 1663265.89,
    },
    {
      canal: "RUTEO OCCIDENTE",
      total_ventas_siva: 24842.23,
      total_nc_valor_siva: 0,
      total: 24842.23,
    },
    {
      canal: "CANAL MODERNO",
      total_ventas_siva: 1241352.64,
      total_nc_valor_siva: 34170.79,
      total: 1207181.85,
    },
    {
      canal: "INDUSTRIAL",
      total_ventas_siva: 239787.5,
      total_nc_valor_siva: 3409.82,
      total: 236377.68,
    },
    {
      canal: "EXPORTACION",
      total_ventas_siva: 320266.99,
      total_nc_valor_siva: 0,
      total: 320266.99,
    },
    {
      canal: "VENTA DIRECTA",
      total_ventas_siva: 0,
      total_nc_valor_siva: 0,
      total: 0,
    },
    {
      canal: "TIENDA",
      total_ventas_siva: 105500.94,
      total_nc_valor_siva: 0,
      total: 105500.94,
    },
    {
      canal: "MERCADEO",
      total_ventas_siva: 6143.75,
      total_nc_valor_siva: 0,
      total: 6143.75,
    },
    {
      canal: "MAYOREO ORIENTE",
      total_ventas_siva: 1742205.46,
      total_nc_valor_siva: 5194.6,
      total: 1737010.86,
    },
  ];
}

export default async function Canal() {
  const data = await getData();

  return (
    <div className="space-y-4">
      {/* <h2 className="text-3xl font-bold tracking-tight">Tablas de Datos</h2> */}
      <h2 className="text-3xl font-bold tracking-tight border-b pb-2 first:mt-0">
        Tablas de Datos
      </h2>
      <div className="space-y-2">
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
