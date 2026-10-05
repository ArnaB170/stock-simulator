'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
)

export function PortfolioPerformance({ history = [] }: { history?: number[] }) {
  // Map the math to the chart
  const data = {
    labels: history.map((_, i) => (i === 0 ? 'Start' : `Round ${i}`)),
    datasets: [
      {
        label: 'Portfolio Balance',
        data: history,
        borderColor: '#39FF14', // Sleek Neon Green
        backgroundColor: 'rgba(57, 255, 20, 0.05)', // Faint green fill under the line
        borderWidth: 3,
        pointBackgroundColor: '#39FF14',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.3, // Adds a slight curve to the line
      },
    ],
  }

  // Visual styling rules for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false }, // Removes vertical grid lines for a cleaner look
        ticks: { color: '#666' },
      },
      y: {
        grid: { display: false }, // Removes horizontal grid lines
        ticks: {
          color: '#666',
          callback: (value: any) => '$' + value.toLocaleString(), // Formats the Y-axis as currency
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => '$' + context.parsed.y.toLocaleString(),
        },
      },
    },
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#0a0a0a] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wider text-gray-400">
          PORTFOLIO PERFORMANCE
        </h2>
        {/* Pulsing "Live" indicator for style */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#39FF14]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39FF14] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#39FF14]"></span>
          </span>
          Live
        </div>
      </div>
      
      {/* Container that holds the actual chart */}
      <div className="h-[300px] w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}