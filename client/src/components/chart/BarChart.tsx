import { useEffect, useRef } from "react";
import { Chart, registerables, ChartType} from "chart.js";


const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<ChartType, unknown> | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    const createChart = () => {
      Chart.register(...registerables);
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["1월", "2월", "3월", "4월", "5월", "6월","7월"],
            datasets: [
              {
                label: "한달 소비액 /단위(만원)",
                data: [90, 100, 90, 120, 100, 90, 40],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 2,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
          },
        });
      }
    };

    const destroyChart = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };

    destroyChart(); // Destroy the existing chart
    createChart(); // Create a new chart

    return () => {
      destroyChart(); // Destroy the chart when the component unmounts
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart;
