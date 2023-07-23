import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

ChartJS.register(ArcElement, Tooltip, Legend);

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "right",
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
          const info = `${label}: ${count}원 (${percentage}%)`;
          return info;
        },
      },
    },
  },
};

export const DoughnutContainer = styled.div`
  width: 100%;
  height: 100%;
  /* max-width: 35rem;
  max-height: 30rem; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function AssetDoughnutChart() {
  const profileInput = useSelector((state: RootState) => {
    return state.proFile.profileData?.data?.monthlyResponseDto?.input;
  });
  const profileStock = useSelector((state: RootState) => {
    return state.proFile.profileData?.data?.monthlyResponseDto?.stock;
  });
  const profileEtc = useSelector((state: RootState) => {
    return state.proFile.profileData?.data?.monthlyResponseDto?.etc;
  });

  const data = {
    labels: ["입출금", "증권", "기타"],
    datasets: [
      {
        label: "test",
        data: [profileInput, profileStock, profileEtc],
        backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
        borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  return (
    <Main>
      <DoughnutContainer>
        <ChartWrapper>
          <Doughnut data={data} options={options} />
        </ChartWrapper>
      </DoughnutContainer>
    </Main>
  );
}
