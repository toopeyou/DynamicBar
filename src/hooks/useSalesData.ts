
import { useMemo } from "react";
import { Sale, Filters } from "@/types/sales";
import { salesData } from "@/data/sales";

export function useSalesData(filters: Filters) {
  const grouped = new Map<string, number>();
  const filteredData = useMemo(() => {
    return salesData.filter((sale) => {
      const matchesDate =
        sale.date >= filters.startDate &&
        sale.date <= filters.endDate;

      const matchesCategory =
        filters.category === "All" ||
        sale.category === filters.category;

      const matchesRegion =
        filters.region === "All" ||
        sale.region === filters.region;

      return matchesDate && matchesCategory && matchesRegion;
    });
  }, [filters]);

  const chartData = useMemo(() => {
    const grouped = new Map<string,{ total: number; orders: number }
        >();

        filteredData.forEach((sale) => {
        const month = sale.date.slice(0, 7);

        const current = grouped.get(month) || {
            total: 0,
            orders: 0,
        };

        grouped.set(month, {
            total: current.total + sale.amount,
            orders: current.orders + 1,
        });
        });

        return Array.from(grouped, ([date, values]) => ({
        date,
        total: values.total,
        orders: values.orders,
        })).sort((a, b) => a.date.localeCompare(b.date));
    }, [filteredData]);

  const totalSales = useMemo(() => {
    return filteredData.reduce((sum, sale) => sum + sale.amount, 0);
  }, [filteredData]);

  return {
    filteredData,
    chartData,
    totalSales,
  };
}
