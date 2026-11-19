import type { Sale } from "@/types/sales";
export function exportCSV(data: Sale[]) {
  const headers = [
    "ID",
    "Date",
    "Category",
    "Region",
    "Amount",
  ];

  const rows = data.map((sale) => [
    sale.id,
    sale.date,
    sale.category,
    sale.region,
    sale.amount,
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row
        .map((value) =>
          `"${String(value).replace(/"/g, '""')}"`
        )
        .join(";")
    )
    .join("\r\n");
  const blob = new Blob(
    ["\uFEFF" + csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "sales-report.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
