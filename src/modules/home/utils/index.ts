import { months } from "./date";

type GetChartDataProps = {
  data: {
    income: number;
    expense: number;
    month: number;
    day: number;
  }[];
};

export function getRecordsChartData(data: GetChartDataProps["data"]) {
  const dataMap = new Map(data.map((item) => [item.month, item]));

  return months.map((month, index) => {
    const dataItem = dataMap.get(index);

    return {
      month,
      day: dataItem ? dataItem.day : 0,
      income: dataItem ? dataItem.income : 0,
      expense: dataItem ? dataItem.expense : 0,
    };
  });
}
