import { Bar } from 'react-chartjs-2';


const BudgetChart = ({ expenditure ,budget }) => {
  

  const chartData = {
    labels: ['예산', '지출'],
    datasets: [
      {
        label: '예산 대비 지출',
        data: [budget, expenditure],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BudgetChart;