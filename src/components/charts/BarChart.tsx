"use client";
import { useState } from "react";

interface ChartData {
  date: string;
  total: number;
  orders?: number;
}
interface BarChartProps { data: ChartData[]}

export default function BarChart({ data }: BarChartProps) {
  const width = 800;
  const height = 350;

  const padding = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 65,
  };
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(
    ...data.map((item) => item.total),
    0
  );

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        No data available for selected filters
      </div>
    );
  }

  const scaleMax = maxValue > 0
    ? Math.ceil(maxValue / 1000) * 1000
    : 1000;

  const barWidth = data.length
    ? Math.min(50, innerWidth / data.length / 2)
    : 0;

  const getX = (index: number) => {
    return padding.left +
      (index + 0.5) * (innerWidth / Math.max(data.length, 1));
  };

  const getY = (value: number) => {
    return padding.top +
      innerHeight -
      (value / scaleMax) * innerHeight;
  };

  const formatMonth = (date: string) => {
    return new Date(date + "-02").toLocaleDateString("en-US",{ month: "short", year: "2-digit" });
  };

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full"role="img" aria-labelledby="chart-title">
        <title id="chart-title" >Month Sales</title>
        {[0, 1, 2, 3, 4].map((step) => {
            const value = (scaleMax / 4) * step;
            const y = getY(value);
            return (
              <g key={step}>
                <line x1={padding.left}  y1={y}  x2={width - padding.right}  y2={y} stroke="currentColor" opacity="0.1" strokeDasharray="4 4" />
                <text x={padding.left - 10}  y={y + 4} textAnchor="end" fill="currentColor" fontSize="11">
                  {value.toLocaleString("en-US")}
                </text>
              </g>
            );
        })}

        {data.map((item, index) => {
          const x = getX(index) - barWidth / 2;
          const y = getY(item.total);
          const barHeight = Math.max(0, padding.top + innerHeight - y);
          return (
            <g key={item.date} tabIndex={0} role="button"
             aria-label={`${formatMonth(item.date)}: $${item.total.toLocaleString("en-US")}, ${item.orders ?? 0} orders`}
              onMouseEnter={() => setActiveBar(index)}
              onMouseLeave={() => setActiveBar(null)}
              onFocus={() => setActiveBar(index)}
              onBlur={() => setActiveBar(null)}
                className="outline-none focus:outline-none"
            >
              <rect  x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx="5"
              fill={activeBar === index ? "#2563eb" : "#3b82f6"}
              stroke={activeBar === index ? "#f59e0b" : "none"}
              strokeWidth={activeBar === index ? 3 : 0}
              className="transition-all duration-500 ease-in-out"
              />
                <text x={getX(index)} y={height - 20} textAnchor="middle" fill="currentColor"  fontSize="12">
                    {formatMonth(item.date)}
                </text>
                {activeBar === index && (
                    <g pointerEvents="none">
                    <rect x={Math.max(5, Math.min(x - 25, width - 155))} y={Math.max(5, y - 65)}
                        width="100"
                        height="55"
                        rx="5"
                        fill="#1f2937"
                    />
                    <text  x={Math.max(5, Math.min(x - 25, width - 155)) + 10} y={Math.max(5, y - 65) + 20} fill="white" fontSize="11">
                        {formatMonth(item.date)}
                    </text>
                    <text y={Math.max(5, y - 65) + 40} fill="white" fontSize="13" fontWeight="bold"
                        x={Math.max(5, Math.min(x - 25, width - 155)) + 10}
                    >
                        ${item.total.toLocaleString("en-US")}
                    </text>
                    </g>
                )}
                </g>
          );
        })}
      </svg>

    </div>
  );
}
