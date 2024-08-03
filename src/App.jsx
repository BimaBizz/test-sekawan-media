import { Outlet } from "react-router-dom"
import { HiChartPie, HiOutlineTicket, HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineUser, HiOutlineBookmarkAlt, HiOutlineAdjustments, HiOutlineChartPie, HiOutlineCash, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function App() {

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  return (
    <main className="flex">
      <div className="absolute z-[1] left-2 top-6 p-3 text-gray-900 dark:text-white">
        <HiOutlineChevronRight className="cursor-pointer text-3xl" onClick={() => setOpen(!open)}/>
      </div>
      <aside className={`overflow-y-auto w-72 h-screen bg-slate-800 dark:bg-slate-900 left-0 z-10 fixed ${!open ? '' : 'hidden lg:block'}`}>
        <div className="flex items-center gap-2 px-5 py-9 justify-center">
          <HiOutlineChevronLeft className="cursor-pointer text-white text-3xl block lg:hidden" onClick={() => setOpen(!open)}/>
          <div className="rounded-full p-2 bg-blue-500 text-white">
            <HiChartPie className="text-xl"/>
          </div>
          <h1 className="font-medium text-slate-400 dark:text-white text-xl">Dashboard Kit</h1>
        </div>
        <ul>
          <li className={"relative hover:bg-slate-700 "+ (window.location.pathname === '/' ? 'bg-slate-700' : '')}>
            {window.location.pathname === '/' ? <div className="absolute left-0 h-full w-1 bg-white"></div> : ''}
            <a href="/" className={"flex items-center gap-2 p-3 hover:text-white " + (window.location.pathname === '/' ? 'text-white' : 'text-slate-400')}>
              <div className="rounded-full p-2 ">
                <HiOutlineChartPie className="text-xl"/>
              </div>
              <span>{t('sidebar.overview')}</span>
            </a>
          </li>
          <li className={"relative hover:bg-slate-700 "+ (window.location.pathname === '/tikets' ? 'bg-slate-700' : '')}>
            {window.location.pathname === '/tikets' ? <div className="absolute left-0 h-full w-1 bg-white"></div> : ''}
            <a href="/tikets" className={"flex items-center gap-2 p-3 hover:text-white " + (window.location.pathname === '/tikets' ? 'text-white' : 'text-slate-400')}>
              <div className="rounded-full p-2 ">
                <HiOutlineTicket className="text-xl"/>
              </div>
              <span>{t('sidebar.tickets')}</span>
            </a>
          </li>
          <li className={"relative hover:bg-slate-700 "+ (window.location.pathname === '/ideas' ? 'bg-slate-700' : '')}>
            {window.location.pathname === '/ideas' ? <div className="absolute left-0 h-full w-1 bg-white"></div> : ''}
            <a href="/ideas" className={"flex items-center gap-2 p-3 hover:text-white " + (window.location.pathname === '/ideas' ? 'text-white' : 'text-slate-400')}>
              <div className="rounded-full p-2 ">
                <HiOutlineLightBulb className="text-xl"/>
              </div>
              <span>{t('sidebar.ideas')}</span>
            </a>
          </li>
          <li className={"relative hover:bg-slate-700 "+ (window.location.pathname === '/contacts' ? 'bg-slate-700' : '')}>
            {window.location.pathname === '/contacts' ? <div className="absolute left-0 h-full w-1 bg-white"></div> : ''}
            <a href="/contacts" className={"flex items-center gap-2 p-3 hover:text-white " + (window.location.pathname === '/contacts' ? 'text-white' : 'text-slate-400')}>
              <div className="rounded-full p-2 ">
                <HiOutlineUserGroup className="text-xl"/>
              </div>
              <span>{t('sidebar.contacts')}</span>
            </a>
          </li>
          <li className={"relative hover:bg-slate-700 "+ (window.location.pathname === '/agents' ? 'bg-slate-700' : '')}>
            {window.location.pathname === '/agents' ? <div className="absolute left-0 h-full w-1 bg-white"></div> : ''}
            <a href="/agents" className={"flex items-center gap-2 p-3 hover:text-white " + (window.location.pathname === '/agents' ? 'text-white' : 'text-slate-400')}>
              <div className="rounded-full p-2 ">
                <HiOutlineUser className="text-xl"/>
              </div>
              <span>{t('sidebar.agents')}</span>
            </a>
          </li>
          <li className={"relative hover:bg-slate-700 "+ (window.location.pathname === '/articles' ? 'bg-slate-700' : '')}>
            {window.location.pathname === '/articles' ? <div className="absolute left-0 h-full w-1 bg-white"></div> : ''}
            <a href="/articles" className={"flex items-center gap-2 p-3 hover:text-white " + (window.location.pathname === '/articles' ? 'text-white' : 'text-slate-400')}>
              <div className="rounded-full p-2 ">
                <HiOutlineBookmarkAlt className="text-xl"/>
              </div>
              <span>{t('sidebar.articles')}</span>
            </a>
          </li>
          <li>
            <hr className="border-slate-700 my-5"/>
          </li>
          <li className={"relative hover:bg-slate-700 "+ (window.location.pathname === '/settings' ? 'bg-slate-700' : '')}>
            {window.location.pathname === '/settings' ? <div className="absolute left-0 h-full w-1 bg-white"></div> : ''}
            <a href="/settings" className={"flex items-center gap-2 p-3 hover:text-white " + (window.location.pathname === '/settings' ? 'text-white' : 'text-slate-400')}>
              <div className="rounded-full p-2 ">
                <HiOutlineAdjustments className="text-xl"/>
              </div>
              <span>{t('sidebar.settings')}</span>
            </a>
          </li>
          <li className={"relative hover:bg-slate-700 "+ (window.location.pathname === '/subscription' ? 'bg-slate-700' : '')}>
            {window.location.pathname === '/subscription' ? <div className="absolute left-0 h-full w-1 bg-white"></div> : ''}
            <a href="/subscription" className={"flex items-center gap-2 p-3 hover:text-white " + (window.location.pathname === '/subscription' ? 'text-white' : 'text-slate-400')}>
              <div className="rounded-full p-2 ">
                <HiOutlineCash className="text-xl"/>
              </div>
              <span>{t('sidebar.subscription')}</span>
            </a>
          </li>
        </ul>
      </aside>
      <Outlet />
    </main>
  )
}