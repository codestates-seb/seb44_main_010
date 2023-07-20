import { Bar } from "react-chartjs-2";

export type SummarySumData = [number, number, number];

export interface BudgetChartProps {
  summarySumData: SummarySumData;
  savedBudget: number;
}

export default function BudgetChart({ summarySumData, savedBudget }: BudgetChartProps){
  const chartData = {
    labels: ["예산 (만원)", "지출 (만원)"],
    datasets: [
      {

        label: '예산 대비 지출',
        data: [savedBudget, summarySumData[1]],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],

        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y" as const, // Explicitly specify the type as a valid value
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}
