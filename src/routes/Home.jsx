import React, { useState, useEffect } from 'react';
import HeaderRoutes from '../components/HeaderRoutes';
import ChartOneYear from '../components/ChartOneYear';
import TiketsAndTask from '../components/TiketsAndTask';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');

  const { t } = useTranslation();
  
  useEffect(() => {
    if (Cookies.get('SESSION_ROLE') === 'user') {
      setUrl(`https://admin.bizzcode.site/api/content/items/tiket?filter={"$and":[{"_cby":{"$regex":"${Cookies.get('SESSION_CBY')}"}}, {"view":true}]}`);
    } else if (Cookies.get('SESSION_ROLE') !== 'user') {
      setUrl('https://admin.bizzcode.site/api/content/items/tiket');
    }
    const fetchData = async () => {
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': 'API-52d47b5eb609f38417004fbbdf75bd77db0b9f6d',
        },
      });
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, [url]);

  const countUnsolved = () => {
    return data.filter(item => item.solved === false).length;
  };
  const countOverdue = () => {
    return data.filter(item => item.overdue === true).length;
  };
  const countOpen = () => {
    return data.filter(item => item.open === true).length;
  };
  const countHold = () => {
    return data.filter(item => item.open === true).length;
  };
  const countTechIssue = () => {
    return data.filter(item => item.type === 'Technical issue').length;
  };
  const countRefundRequest = () => {
    return data.filter(item => item.type === 'Refund request').length;
  };
  const countPending = () => {
    return data.filter(item => item.type === 'Pending').length;
  };
  const countOther = () => {
    return data.filter(item => item.type === 'Other').length;
  };

  return (
    <section className='bg-slate-200 dark:bg-slate-800 min-h-screen w-full ml-0 lg:w-[calc(100%-18rem)] lg:ml-[18rem]'>
      <HeaderRoutes title={t('home.title')}/>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-12'>
        <div className='bg-white dark:bg-slate-700 px-4 py-8 rounded-lg border border-slate-300 dark:border-slate-600 space-y-4 text-center hover:text-blue-500 hover:border-blue-500 group cursor-pointer'>
          <h2 className='text-xl font-medium text-slate-400 group-hover:text-blue-500'>{t('home.unresolved')}</h2>
          <p className='text-4xl font-bold dark:text-white'>{countUnsolved()}</p>
        </div>
        <div className='bg-white dark:bg-slate-700 px-4 py-8 rounded-lg border border-slate-300 dark:border-slate-600 space-y-4 text-center hover:text-blue-500 hover:border-blue-500 group cursor-pointer'>
          <h2 className='text-xl font-medium text-slate-400 group-hover:text-blue-500'>{t('home.overdue')}</h2>
          <p className='text-4xl font-bold dark:text-white'>{countOverdue()}</p>
        </div>
        <div className='bg-white dark:bg-slate-700 px-4 py-8 rounded-lg border border-slate-300 dark:border-slate-600 space-y-4 text-center hover:text-blue-500 hover:border-blue-500 group cursor-pointer'>
          <h2 className='text-xl font-medium text-slate-400 group-hover:text-blue-500'>{t('home.open')}</h2>
          <p className='text-4xl font-bold dark:text-white'>{countOpen()}</p>
        </div>
        <div className='bg-white dark:bg-slate-700 px-4 py-8 rounded-lg border border-slate-300 dark:border-slate-600 space-y-4 text-center hover:text-blue-500 hover:border-blue-500 group cursor-pointer'>
          <h2 className='text-xl font-medium text-slate-400 group-hover:text-blue-500'>{t('home.onHold')}</h2>
          <p className='text-4xl font-bold dark:text-white'>{countHold()}</p>
        </div>
      </div>
      <ChartOneYear/>
      <TiketsAndTask techIssue={countTechIssue()} refundRequest={countRefundRequest()} pending={countPending()} other={countOther()}/>
    </section>
  );
}

export default Home;
