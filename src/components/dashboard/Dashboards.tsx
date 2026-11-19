
"use client";
import { exportCSV } from "@/utils/exportCSV";
import BarChart from "@/components/charts/BarChart";
import ChartDataTable from "@/components/charts/ChartDataTable";
import { useState } from "react";
import { Filters as FiltersType } from "@/types/sales";
import { useSalesData } from "@/hooks/useSalesData";
import ThemeToggle from "./ThemeToggle";
import { SlidersHorizontal } from "lucide-react"; 

import Filters from './Filters'
const initialFilters: FiltersType = {
  startDate: "2026-01-01",
  endDate: "2026-06-30",
  category: "All",
  region: "All",
};

export default function Dashboard() {
  const [filters, setFilters] = useState<FiltersType>(initialFilters);
  const {filteredData, chartData, totalSales } = useSalesData(filters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
 
  return (
    <main className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold"> Sales Analytics</h1>
          <p className="mt-1 text-sm text-gray-500"> Overview of your sales performance</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => exportCSV(filteredData)} disabled={filteredData.length === 0}>
            Export CSV
          </button>
          <p className="text-sm text-gray-500">
            {filteredData.length} records
          </p>         
          <ThemeToggle />
          <button onClick={()=> setMobileFiltersOpen(true)} className="lg:hidden flex rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            <SlidersHorizontal size={20}/>
            Filters</button> 
        </div>
      </div>
      <Filters filters={filters}onChange={setFilters} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-5 dark:border-gray-800">
          <p className="text-sm text-gray-500">Total Sales</p>
          <h2 className="mt-2 text-2xl font-bold">${totalSales.toLocaleString("en-US")}</h2>
        </div>
        <div className="rounded-xl border p-5 dark:border-gray-800">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="mt-2 text-2xl font-bold"> {filteredData.length}</h2>
        </div>
        <div className="rounded-xl border p-5 dark:border-gray-800">
          <p className="text-sm text-gray-500">Average Sale</p>
          <h2 className="mt-2 text-2xl font-bold">
            ${filteredData.length? (totalSales / filteredData.length).toFixed(2)
              : "0.00"}
          </h2>
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6">
            <h2 className="text-lg font-semibold">Sales Overview</h2>
            <p className="text-sm text-gray-500">Month sales
            </p>
        </div>
        <BarChart data={chartData} />
        <ChartDataTable data={chartData} />
      </div>
      {mobileFiltersOpen && (
        <Filters filters={filters}
        onChange={setFilters}
          mobile
          onClose={() => setMobileFiltersOpen(false)}
        />
      )}
    </main>
  );
}
