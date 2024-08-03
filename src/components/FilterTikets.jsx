import React, { useState } from 'react'
import { HiOutlineX } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FilterTikets = (props) => {

  const { t } = useTranslation();
    
    const [searchValue, setSearchValue] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate(`/tikets?s=${searchValue}`);
      window.location.reload();
    }

  return (
    <div className='fixed left-0 top-0 h-full w-full bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4'>
    <div className='bg-slate-100 p-4 rounded-lg w-full md lg:w-1/4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold'>{t('searchTiket.search')}</h1>
        <button className='p-2 bg-red-500 rounded-lg text-white'>
          <HiOutlineX className='text-xl' onClick={props.move}/>
        </button>
      </div>
      <hr className='my-4'/>
      <form onSubmit={handleSubmit} className='mt-4 space-y-2'>
        <div>
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value )}
            className='w-full border outline-none border-slate-300 rounded-lg p-2 my-2'
            required
          />
        </div>
        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg'>{t('searchTiket.button')}</button>
      </form>
    </div>
  </div>
  )
}

export default FilterTikets