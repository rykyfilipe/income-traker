import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useTheme } from '../../context/ThemeContext';
import "./BarChartCard.css"

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props{
    name: string;
    categories: string[];
    budgetData: number[];
    actualData: number[];
}

function BarChartCard({name, categories, budgetData, actualData}: Props) {
  const { colors } = useTheme();
  
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Budget',
        data: budgetData,
        backgroundColor: `${colors.secondary}66`,
        borderColor: colors.secondary,
        borderWidth: 1,
      },
      {
        label: 'Actual',
        data: actualData,
        backgroundColor: `${colors.primary}99`,
        borderColor: colors.primary,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      },
    },
  };

  return (
    <div className="bar-chart-card">
        <h2>{name}</h2>
        <div className="bar-chart-container">
          <Bar data={chartData} options={options} />
        </div>
    </div>
  )
}

export default BarChartCard
