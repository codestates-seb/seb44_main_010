import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartConfiguration } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartConfiguration['options'] = {
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
          const count: number = context.dataset.data[context.dataIndex] as number;
          const total: number = (context.dataset.data as number[]).reduce((acc, cur) => acc + cur, 0);
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
  width: 65rem;
  height: 65rem;
  margin: 0 auto;
`;

export default function ExpenseChart() {
  const data = {
    labels:["식비", "주거", "쇼핑","문화","교통","의료","기타"],
    datasets: [
      {
        label: "test",
        data: [33.3, 33.3, 10, 6.6, 6.6,3.3,6.6],
        backgroundColor: [
          "rgb(168, 216, 234)",
          "rgb(170, 150, 218)",
          "rgb(252, 186, 211)",
          "rgb(255, 255, 210)",
          "rgb(120, 193, 243)",
          "rgb(155, 232, 216)",
          "rgb(248, 253, 207)"
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

