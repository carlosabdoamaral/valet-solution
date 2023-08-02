/**
   * headers: ["Col", "Col", "Col"]
   * content: const dataFormatted = Object.values(data).map((v, i) => {
   *     return [
   *       i,
   *       v.parkinglot.name,
   *       moment(v.created_at).format(DateFormats.DATE),
   *       `${v.summary.start} - ${v.summary.end}`,
   *       toAmount(v.summary.amount),
   *       v.summary.discount,
   *     ];
   *   });
   */
export function handleExportCSV(headers: string[], content: any[]) {
    let csv = `${headers}\n`;
    content.forEach((row) => {
        csv += row.join(",");
        csv += "\n";
    });

    let hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";

    //provide the name for the CSV file to be downloaded
    hiddenElement.download = "ValetSolutionHistoric.csv";
    hiddenElement.click();
}