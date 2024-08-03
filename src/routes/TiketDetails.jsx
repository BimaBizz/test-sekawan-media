import React, { useState, useEffect } from 'react';
import HeaderRoutes from '../components/HeaderRoutes';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const TiketDetails = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://admin.bizzcode.site/api/content/item/tiket/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': Cookies.get('SESSION_API'),
        },
      });
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, [id]);

  const handleCheckboxChange = async (field) => {
    const updatedData = { ...data, [field]: !data[field] };
    setData(updatedData);

    try {
      await fetch(`https://admin.bizzcode.site/api/content/item/tiket/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': Cookies.get('SESSION_API'),
        },
        body: JSON.stringify({ "data": { [field]: updatedData[field] } }),
      });
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <section className='bg-slate-200 dark:bg-slate-800 min-h-screen w-full ml-0 lg:w-[calc(100%-18rem)] lg:ml-[18rem]'>
      <HeaderRoutes title={`${t('tiketDetails.typeTicket')}: ${data.type} ${t('tiketDetails.from')} ${data.username}`} />
      <div className='grid gap-5 px-4 lg:px-12 mt-2'>
        <div className='p-5 bg-white dark:bg-slate-600 rounded-lg'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-xl font-bold dark:text-white'>{t('tiketDetails.description')}</h1>
            <div className={`px-2 py-1 rounded-full text-white text-xs ${data.priority === 'HIGH' ? 'bg-red-500' : data.priority === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`}>
              {t(`tiketDetails.priority.${data.priority}`)}
            </div>
          </div>
          <div className='dark:text-slate-200' dangerouslySetInnerHTML={{ __html: data.post }}></div>
        </div>
        <div className={`p-5 bg-white dark:bg-slate-600 rounded-lg ${Cookies.get('SESSION_ROLE') === 'user' ? 'hidden' : ''}`}>
          <h1 className='text-xl font-bold mb-4 dark:text-white'>{t('tiketDetails.settings')}</h1>
          <div className='flex flex-wrap gap-2 items-center dark:text-slate-200'>
            {['hold', 'open', 'overdue', 'reject', 'view'].map((field) => (
              <div key={field} className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  checked={data[field] || false}
                  id={field}
                  onChange={() => handleCheckboxChange(field)}
                />
                <label htmlFor={field}>{t(`tiketDetails.${field}`)}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TiketDetails;
