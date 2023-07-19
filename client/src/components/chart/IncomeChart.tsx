import styled from "styled-components";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CategoryData } from "../../pages/consumption/summaryPage";
ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<"doughnut"> = {
  plugins: {
    legend: {
      labels: {
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      titleFont: {
        size: 12,
      },
      bodyFont: {
        size: 12,
      },
      footerFont: {
        // size: 10, // there is no footer by default
      },
      callbacks: {
        title: () => {
          return "수입그래프";
        },
        label: (context) => {
          const count: number = context.dataset.data[
            context.dataIndex
          ] as number;
          const total: number = (context.dataset.data as number[]).reduce(
            (acc, cur) => acc + cur,
            0
          );
          const percentage: string = ((count / total) * 100).toFixed(2);
          const label: string = context.label;
          const info = `${label}: ${count}만원 (${percentage}%)`;
          return info;
        },
      },
    },
  },
};

export const DoughnutContainer = styled.div`
  width: 55rem;
  height: 55rem;
  margin: 0 auto;
  margin-top: 10rem;
`;

export interface CategoryDataProps {
  categoryData:CategoryData;
}

export default function IncomeChart({ categoryData }:CategoryDataProps) {
  const data = {
    labels: ["월급", "투자", "기타"],
    datasets: [
      {
        label: "test",
        data: [
          categoryData.categoryincomeSumsMap.월급,
          categoryData.categoryincomeSumsMap.투자,
          categoryData.categoryincomeSumsMap.기타,
        ],
        backgroundColor: [
          "rgb(243, 129, 129)",
          "rgb(252, 227, 138)",
          "rgb(149, 225, 211)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <DoughnutContainer>
        <Doughnut data={data} options={options} />
      </DoughnutContainer>
    </>
  );
}
