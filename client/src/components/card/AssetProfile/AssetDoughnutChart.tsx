import {styled} from "styled-components";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;

export default function AssetDoughnutChart() {
  const Data = {
    labels: ["입출금", "증권", "기타"],
    datasets: [
      {
        data: [40, 20, 35],
        backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
        borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const Options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: {dataIndex: string; formattedValue: string}): string {
            return `${context.formattedValue}%`;
          },
        },
      },
    },
  };

  return (
    <Main>
      <Doughnut data={Data} options={Options}></Doughnut>
    </Main>
  );
}
