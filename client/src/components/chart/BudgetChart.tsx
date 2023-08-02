import { Bar } from "react-chartjs-2";
import { ChartOptions, Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export type SummarySumData = [number, number, number];

export interface BudgetChartProps {
  summarySumData: SummarySumData;
  savedBudget: number;
}

export default function BudgetChart({ summarySumData, savedBudget }: BudgetChartProps){
  const data = {
    labels: ["예산 (원)", "지출 (원)"],
    datasets: [
      {
        label: "금액",
        data: [savedBudget,  -summarySumData[1]], // Replace 5000000 with a valid number for testing
        borderColor: ['#4FC0D0'],
        backgroundColor: ["#4FC0D0", "#A2FF86"],
      }
    ],
  };

  const options: ChartOptions<'bar'> = {
    scales: {
      x: {
        position: 'bottom', // Position the x-axis at the bottom,
        offset: true, // Offset the bars to center them
      },
      y: {
        type: 'linear', // Use category scale for the y-axis to center the bars
      },
    },
  };

  return (
    <div style={{ width: "80rem", height: "35rem" }}>
      <Bar key={savedBudget} data={data} options={options} />
    </div>
  );
}
