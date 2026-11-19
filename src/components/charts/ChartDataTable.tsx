interface ChartData {
  date: string;
  total: number;
  orders?: number;
}

interface ChartDataTableProps {
  data: ChartData[];
}

export default function ChartDataTable({data,}: ChartDataTableProps) {
  return (
    <details className="mt-4">
      <summary className="cursor-pointer text-sm font-medium text-blue-600"> View chart data</summary>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="p-3">Month</th>
              <th className="p-3">Revenue</th>
              <th className="p-3">Orders</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="border-b dark:border-gray-800" key={item.date}>
                <td className="p-3">{item.date}</td>
                <td className="p-3"> ${item.total.toLocaleString("en-US")}</td>
                <td className="p-3">{item.orders ?? 0} </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </details>
  );
}
