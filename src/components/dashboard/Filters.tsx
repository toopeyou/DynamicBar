
"use client";
import { XIcon } from "lucide-react";
import { Filters as FiltersType } from "@/types/sales";
import { salesData } from "@/data/sales";

import { useEffect } from "react";
interface FiltersProps {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
  mobile?: boolean;
  onClose?: () => void;
}

export default function Filters({ filters, onChange,mobile = false, onClose,}: FiltersProps) {
  const updateFilter = (key: keyof FiltersType, value: string) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };
 const regions = [
    "All",
    ...new Set(salesData.map((sale) => sale.region)),
  ];
   const categories = [
    "All",
    ...new Set(salesData.map((sale) => sale.category)),
  ];
  useEffect(() => {
    if (!mobile) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow;};
  }, [mobile]);

  
  const resetFilters = () => {
    onChange({
      startDate: "2026-01-01",
      endDate: "2026-06-30",
      category: "All",
      region: "All",
    });
  };

  return (
  <div className={mobile ? "fixed inset-0 z-50 flex items-end bg-black/40" : "hidden lg:block"}>
    <div className={mobile? "w-full max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl dark:bg-gray-900"
        : "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
      }>

      {mobile && (
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Filters</h3>
         <button onClick={onClose} className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
            <XIcon size={20} />
          </button>
        </div>
      )}


      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">From</label>
          <input className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800"
            type="date" value={filters.startDate} max={filters.endDate}
            onChange={(e) =>updateFilter("startDate", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">To</label>
          <input className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800"
            type="date" value={filters.endDate} min={filters.startDate}
            onChange={(e) => updateFilter("endDate", e.target.value) }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">category</label>
          <select value={filters.category} onChange={(e) => updateFilter("category", e.target.value) }
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
          >
            {categories.map((region) => (
              <option key={region} value={region}>
                {region === "All" ? "All regions" : region}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Region</label>
          <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
            value={filters.region}
            onChange={(e) => updateFilter("region", e.target.value) }
          >
            {regions.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All category" : category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button  className="w-full rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>
      </div>    
    </div>
  </div>
  );
}
