import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '../../context/ThemeContext';
import "./ChartCard.css"

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
    name:string;
    datasets: Array<{ name: string; data: number[] }>;
}

function ChartCard({name, datasets}:Props) {
  const { colors, currency } = useTheme();
  
  const colorPalette = [
    colors.primary, 
    colors.secondary, 
    colors.accent, 
    '#DDA0DD', 
    '#EE82EE', 
    '#DA70D6',
    '#BA55D3',
    '#9932CC'
  ];
  
  const chartData = {
    labels: datasets.map(d => d.name),
    datasets: [
      {
        label: 'Amount',
        data: datasets.map(d => d.data[0] || 0),
        backgroundColor: datasets.map((_, index) => 
          `${colorPalette[index % colorPalette.length]}CC`
        ),
        borderColor: datasets.map((_, index) => 
          colorPalette[index % colorPalette.length]
        ),
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return currency + context.parsed.x.toFixed(2);
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return currency + value;
          }
        },
        grid: {
          color: '#e2e8f0',
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold' as const,
          }
        }
      }
    },
  };

  return (
    <div className="chart-card">
        <h2>{name}</h2>
        <Bar data={chartData} options={options} />
    </div>
  )
}

export default ChartCard