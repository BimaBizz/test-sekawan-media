import React, { useState } from 'react'
import { HiChartPie } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {

  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!validateEmail(email)) {
      errors.email = t('error.emailInvalid');
    }

    if (!validatePassword(password)) {
      errors.password = t('error.passwordInvalid');
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = t('error.passwordNotMatch');
    }

    if (Object.keys(errors).length === 0) {
        setLoading(true);
        try {
          const response = await fetch('https://admin.bizzcode.site/api/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Api-Key': 'API-1c4b6c166d174997c552f8b163e7670c1bacffa9',
            },
            body: JSON.stringify({
                "name" : fullName,
                "username" : userName,
                "email" : email,
                "password" : password
                }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            navigate('/login');
          } else {
            setErrors({ form: data.message || t('error.loginFailed') });
          }
        } catch (error) {
          setErrors({ form: t('error.loginFailed') });
        } finally {
          setLoading(false);
        }
      } else {
        setErrors(errors);
      }
  };


  return (
    <main className='relative bg-[#363740] dark:bg-slate-900 min-h-screen flex justify-center items-center p-4'>
        <div className='bg-white dark:bg-slate-800 max-w-lg w-full p-7 rounded-lg flex flex-col items-center'>
            <div className='flex flex-col items-center space-y-4 mb-9'>
                <div className='bg-blue-500 p-4 rounded-full'>
                    <HiChartPie size={40} className='text-white'/>
                </div>
                <h1 className='text-2xl text-slate-400'>Dasboard Kit</h1>
            </div>
            <div className='flex flex-col items-center text-center space-y-4 mb-9'>
                <h2 className='text-slate-900 dark:text-white text-3xl font-semibold'>t{t('signup.messageSignup')}</h2>
                <p className='text-slate-400 uppercase'>{t('signup.subMessageLogin')}</p>
                <p className='text-red-500 font-bold'>{errors.form || errors.email || errors.password || errors.confirmPassword}</p>
            </div>
            <form className='flex flex-col gap-5 w-full mb-5' onSubmit={handleSubmit}>
                <div className='space-y-2'>
                    <label htmlFor="text" className='text-slate-400 uppercase'>{t('signup.fullName')}</label>
                    <input type="text" placeholder={t('signup.fullName')} value={fullName} onChange={(e) => setFullName(e.target.value)} className='w-full p-4 rounded-lg border-none outline-none bg-slate-100 border border-slate-400 dark:bg-slate-700 dark:text-slate-100' />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="text" className='text-slate-400 uppercase'>{t('signup.userName')}</label>
                    <input type="text" placeholder={t('signup.userName')} value={userName} onChange={(e) => setUserName(e.target.value)} className='w-full p-4 rounded-lg border-none outline-none bg-slate-100 border border-slate-400 dark:bg-slate-700 dark:text-slate-100' />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="email" className='text-slate-400 uppercase'>{t('signup.email')}</label>
                    <input type="text" placeholder={t('signup.email')} value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-4 rounded-lg border-none outline-none bg-slate-100 border border-slate-400 dark:bg-slate-700 dark:text-slate-100' />
                </div>
                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <label htmlFor="password" className='text-slate-400 uppercase'>{t('signup.password')}</label>
                    </div>
                    <input type="password" placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-4 rounded-lg border-none outline-none bg-slate-100 border border-slate-400 dark:bg-slate-700 dark:text-slate-100' />
                </div>
                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <label htmlFor="password" className='text-slate-400 uppercase'>{t('signup.confirmPassword')}</label>
                    </div>
                    <input type="password" placeholder='*******' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='w-full p-4 rounded-lg border-none outline-none bg-slate-100 border border-slate-400 dark:bg-slate-700 dark:text-slate-100' />
                </div>
                <button type='submit' className='w-full p-4 rounded-md border-none bg-blue-500 text-white'>{loading ? t('signup.loading') : t('signup.signup')}</button>
            </form>
            <p className='text-slate-400 mt-4'>{t('signup.didnotHaveAccount')} <Link to="/login" className='text-blue-500 font-semibold'>{t('signup.login')}</Link></p>
        </div>
    </main>
  )
}

export default Login