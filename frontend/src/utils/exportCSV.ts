export const exportCSV = (data: any[], filename = "leads.csv") => {
  const headers = ["Name", "Email", "Company", "Status", "Source"];

  const rows = data.map((lead) => [
    lead.name,
    lead.email,
    lead.company,
    lead.status,
    lead.source,
  ]);

  let csvContent =
    headers.join(",") + "\n" + rows.map((r) => r.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};