import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';
import Chart from 'chart.js/auto';
import { t } from 'i18next';

const ChartOneYear = () => {
  const chartRef = useRef(null);

  const data = {
    labels: Array.from({ length: 24 }, (_, i) => i), // x-axis labels from 0 to 23
    datasets: [
      {
        label: t('home.today'),
        data: [10, 20, 30, 40, 30, 20, 10, 15, 25, 35, 45, 35, 25, 15, 10, 20, 30, 40, 30, 20, 10, 5, 10, 15],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
      },
      {
        label: t('home.yesterday'),
        data: [5, 15, 25, 35, 25, 15, 5, 10, 20, 30, 40, 30, 20, 10, 5, 15, 25, 35, 25, 15, 5, 10, 5, 10],
        borderColor: '#94a3b8',
        backgroundColor: 'rgba(148, 163, 184, 0.2)',
        fill: true,
      }
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="px-4 lg:px-12 mt-5">
      <div className="grid grid-cols-3 bg-white dark:bg-slate-700 rounded-lg">
        <div className="col-span-3 md:col-span-2 p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('home.trends')}</h2>
          <Line ref={chartRef} data={data} options={options} />
        </div>
        <div className="col-span-3 md:col-span-1 h-full p-6 shadow-md space-y-4">
          <div className='text-center'>
            <h3 className="text-lg text-slate-400 font-medium">{t('home.resolve')}</h3>
            <p className="text-2xl font-bold dark:text-white">449</p>
          </div>
          <hr />
          <div className='text-center'>
            <h3 className="text-lg text-slate-400 font-medium">{t('home.received')}</h3>
            <p className="text-2xl font-bold dark:text-white">426</p>
          </div>
          <hr />
          <div className='text-center'>
            <h3 className="text-lg text-slate-400 font-medium">{t('home.avarage')}</h3>
            <p className="text-2xl font-bold dark:text-white">33m</p>
          </div>
          <hr />
          <div className='text-center'>
            <h3 className="text-lg text-slate-400 font-medium">{t('home.avarage2')}</h3>
            <p className="text-2xl font-bold dark:text-white">3h 8m</p>
          </div>
          <hr />
          <div className='text-center'>
            <h3 className="text-lg text-slate-400 font-medium">{t('home.sla')}</h3>
            <p className="text-2xl font-bold dark:text-white">94%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartOneYear;
