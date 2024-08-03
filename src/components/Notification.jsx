import React, { useState, useEffect } from 'react'
import { HiOutlineX } from "react-icons/hi";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Notification = (props) => {

    const { t } = useTranslation();

    const [notif, setNotif] = useState([])
    const [url, setUrl] = useState('')

    const navigate = useNavigate()

    useEffect(() => {

      if (Cookies.get('SESSION_ROLE') === 'user') {
          setUrl(`https://admin.bizzcode.site/api/content/items/tiket?filter={"$and":[{"_cby":{"$regex":"${Cookies.get('SESSION_CBY')}"}}, {"reject":false}]}&sort={"_created":-1}`)
      } else if (Cookies.get('SESSION_ROLE') !== 'user') {
          setUrl('https://admin.bizzcode.site/api/content/items/tiket?filter={"view":false}&sort={"_created":-1}')
      }

      const fecthData = async () => {
          const res = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Api-Key': Cookies.get('SESSION_API'),
              },
          })
          const data = await res.json()
          setNotif(data)
      }
          
      fecthData()
    }, [url])

  return (
    <div className='fixed left-0 top-0 h-full w-full bg-black/50 backdrop-blur-sm flex justify-end z-50 overflow-y-auto'>
      <div className='min-h-full h-auto w-1/2 lg:w-1/4 bg-slate-100 dark:bg-slate-900'>
        <div className='flex items-center justify-between p-4'>
          <h1 className='text-xl font-bold dark:text-white'>{t('notification.title')}</h1>
          <button className='p-2 bg-red-500 rounded-lg text-white'><HiOutlineX className='text-xl' onClick={props.move}/></button>
        </div>
        <hr className='my-4 border-slate-400 dark:border-slate-700'/>
        <div className='flex flex-col gap-2 p-4 overflow-y-auto bg-slate-100 dark:bg-slate-900'>
          {Cookies.get('SESSION_ROLE') !== 'user' ? notif.map((item, index) => (
            <div key={index} className='flex cursor-pointer flex-col gap-2 p-4 border-b border-slate-400 dark:border-slate-700' onClick={() => navigate(`/tikets/${item._id}`)}>
              {item.view ? <div className='p-2 w-fit rounded-full bg-green-500 text-white text-xs'>{t('notification.reviewed')}</div> : <div className='p-2 w-fit rounded-full bg-red-500 text-white text-xs'>{t('notification.waitingReview')}</div>}
              <p className='font-bold dark:text-white'>{item.username} {t('notification.createdTiket')}</p>
              <div className='text-slate-400' dangerouslySetInnerHTML={{__html: item.post.slice(0, 50)+"..."}}></div>
            </div>
          )) : notif.map((item, index) => (
            <div key={index} className='flex cursor-pointer flex-col gap-2 p-4 border-b border-slate-400 dark:border-slate-700' onClick={() => navigate(`/tikets/${item._id}`)}>
              <div className='flex justify-between items-center'>
                <p className='font-bold dark:text-white'>{item.type}</p>
                {item.view ? <div className='p-2 rounded-full bg-green-500 text-white text-xs'>{t('notification.reviewed')}</div> : <div className='p-2 rounded-full bg-red-500 text-white text-xs'>{t('notification.waitingReview')}</div>}
              </div>
              <div className='text-slate-400' dangerouslySetInnerHTML={{__html: item.post.slice(0, 50)+"..."}}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notification