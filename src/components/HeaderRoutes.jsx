import React, { useEffect, useState } from 'react';
import { HiOutlineUserCircle, HiBell, HiOutlineSearch, HiOutlineMail, HiOutlineAdjustments, HiOutlineLogout, HiOutlineUser, HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import FilterTikets from './FilterTikets';
import Notification from './Notification';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const HeaderRoutes = (props) => {
  const { t } = useTranslation();

  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotiv, setOpenNotiv] = useState(false);
  const navigate = useNavigate();

  const getDefaultTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userPrefersDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getDefaultTheme);

  const logout = () => {
    Cookies.remove('SESSION_DATA');
    Cookies.remove('SESSION_API');
    Cookies.remove('SESSION_ROLE');
    Cookies.remove('SESSION_CBY');
    navigate('/login');
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  useEffect(() => {
    const token = Cookies.get('SESSION_DATA');
    if (token) {
      const decoded = jwtDecode(token);
      setProfile(decoded);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <>
      <div className={`${openSearch ? 'block' : 'hidden'}`}>
        <FilterTikets move={() => setOpenSearch(!openSearch)} />
      </div>
      <div className={`${openNotiv ? 'block' : 'hidden'}`}>
        <Notification move={() => setOpenNotiv(!openNotiv)} />
      </div>
      <div className='flex py-9 px-0 lg:px-12 gap-2 justify-between relative'>
        <h2 className='text-2xl font-bold ml-14 lg:ml-0 dark:text-white'>{props.title}</h2>
        <div className='flex space-x-2 mr-5 lg:mr-0 text-slate-400 items-center'>
          <HiOutlineSearch className='text-3xl cursor-pointer' onClick={() => setOpenSearch(!openSearch)} />
          <div className='relative'>
            <HiBell className='text-3xl cursor-pointer relative' onClick={() => setOpenNotiv(!openNotiv)} />
            <div className='w-2 h-2 z-20 bg-blue-500 rounded-full absolute top-0 right-0'></div>
          </div>
          <div className='hidden lg:flex'>|</div>
          {profile && <p className='hidden lg:flex justify-center items-center text-xl'>{profile.name}</p>}
          <HiOutlineUserCircle className='text-3xl cursor-pointer ml-14' onClick={toggleMenu} />
        </div>
        <div className={'absolute -bottom-52 lg:-bottom-44 right-0 flex flex-col space-y-3 mr-5 ' + (open ? '' : 'hidden')}>
          {profile && (
            <ul className='bg-slate-100/90 dark:bg-slate-600 dark:text-white p-3 gap-2 rounded-lg'>
              <li className='block lg:hidden mb-3 lg:mb-0'><HiOutlineUser className='inline mr-2 text-xl' />{profile.name}</li>
              <li><HiOutlineMail className='inline mr-2 text-xl' />{profile.email}</li>
              <li className='my-3'><hr /></li>
              <li className='mb-3'><HiOutlineAdjustments className='inline mr-2 text-xl' />{t('home.settings')}</li>
              <li className='mb-3 cursor-pointer' onClick={toggleTheme}>
                {theme === 'light' ? (
                  <><HiOutlineMoon className='inline mr-2 text-xl' />{t('home.dark')}</>
                ) : (
                  <><HiOutlineSun className='inline mr-2 text-xl' />{t('home.light')}</>
                )}
              </li>
              <li className='mb-3 cursor-pointer' onClick={toggleLanguage}>
                {i18n.language === 'en' ? (
                  <><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className='inline mr-2' id="flag-icons-id" viewBox="0 0 640 480"><script xmlns=""/>
                      <path fill="#e70011" d="M0 0h640v240H0Z"/>
                      <path fill="#fff" d="M0 240h640v240H0Z"/>
                    <script xmlns=""/></svg>Bahasa Indonesia</>
                ) : (
                  <><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className='inline mr-2' id="flag-icons-gb" viewBox="0 0 640 480"><script xmlns=""/>
                      <path fill="#012169" d="M0 0h640v480H0z"/>
                      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/>
                      <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/>
                      <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/>
                      <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/>
                    <script xmlns=""/></svg>English</>
                )}
              </li>
              <li onClick={logout} className='cursor-pointer'><HiOutlineLogout className='inline mr-2 text-xl' />{t('home.logout')}</li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderRoutes;
