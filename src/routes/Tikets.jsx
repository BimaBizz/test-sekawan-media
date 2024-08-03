import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderRoutes from '../components/HeaderRoutes';
import CreateTickets from '../components/CreateTickets';
import Cookies from 'js-cookie';
import { HiOutlinePlusCircle, HiOutlineSortDescending, HiOutlineFilter, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useTranslation } from 'react-i18next';

const TicketList = () => {

  const { t } = useTranslation();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState(-1);
  const [sortOpen, setSortOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [url, setUrl] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('s');

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (sortField) {
          queryParams.append('sort', JSON.stringify({ [sortField]: sortOrder }));
        }

        if (Cookies.get('SESSION_ROLE') !== 'user') {
          setUrl('https://admin.bizzcode.site/api/content/items/tiket?');
        } else if (Cookies.get('SESSION_ROLE') === 'user') {
          setUrl(`https://admin.bizzcode.site/api/content/items/tiket?filter={"$and":[{"_cby":{"$regex":"${Cookies.get('SESSION_CBY')}"}}, {"view":true}, {"reject":false}]}`);
        }

        if (query && Cookies.get('SESSION_ROLE') === 'user') {
          queryParams.append('filter', `{"$and":["post":{"$regex":"${query}"}},{"_cby":{"$regex":"${Cookies.get('SESSION_CBY')}"}}]}`);
        } else if (query && Cookies.get('SESSION_ROLE') !== 'user') {
          queryParams.append('filter', `{"$and":["post":{"$regex":"${query}"}]}`);
          setUrl('https://admin.bizzcode.site/api/content/items/tiket?');
        }

        const response = await fetch(`${url}${queryParams.toString()}&limit=${limit}&skip=${skip}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Api-Key': Cookies.get('SESSION_API'),
          },
        });

        const data = await response.json();
        setTickets(data.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [sortField, sortOrder, limit, skip, query, url]);

  const handleSortChange = (field) => {
    setTickets([]);
    setSortField(field);
    setSortOrder(prevOrder => (field === sortField ? -prevOrder : -1));
  };

  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    return (
      <>
        <p className='font-bold text-xl dark:text-white'>{date.toLocaleDateString('en-US', options)}</p>
        <p className='text-slate-400'>{date.toLocaleTimeString('en-US', timeOptions)}</p>
      </>
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return <p className='text-slate-400'>{date.toLocaleDateString('en-US', options)}</p>;
  };

  const next = () => {
    setSkip(skip + limit);
    setTickets([]);
  };

  const prev = () => {
    setSkip(skip - limit);
    setTickets([]);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setSkip(0); 
    setTickets([]);
  };

  return (
    <>
      {openCreate && <CreateTickets move={setOpenCreate} />}
      <section className='bg-slate-200 dark:bg-slate-800 min-h-screen w-full ml-0 lg:w-[calc(100%-18rem)] lg:ml-[18rem]'>
        <HeaderRoutes title={t('ticketsPage.tickets')} />
        <div className="px-4 lg:px-12 mb-5">
          <div className="overflow-x-auto bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg">
            <div className='flex justify-between p-5 lg:p-8'>
              <h2 className="text-2xl font-bold dark:text-white">{t('ticketsPage.ticketDetails')}</h2>
              <div className="flex items-center gap-5 lg:gap-10 dark:text-white">
                <button className="font-medium" onClick={() => setOpenCreate(!openCreate)}>
                  <HiOutlinePlusCircle className='inline mr-1 text-slate-400' />
                  {t('ticketsPage.createTicket')}
                </button>
                <button className="font-medium" onClick={() => setSortOpen(!sortOpen)}>
                  <HiOutlineSortDescending className='inline mr-1 text-slate-400' />
                  {t('ticketsPage.sort')}
                </button>
                <button className="font-medium">
                  <HiOutlineFilter className='inline mr-1 text-slate-400' />
                  {t('ticketsPage.filter')}
                </button>
              </div>
            </div>
            {sortOpen && (
              <div className="w-full px-4 mb-5 lg:px-12 flex justify-end space-x-3">
                <div className='flex items-center text-slate-500 dark:text-slate-100'>
                  <input
                    type="checkbox"
                    name="sort"
                    id="sortType"
                    onChange={() => handleSortChange('type')}
                    checked={sortField === 'type'}
                  />
                  <label htmlFor="sortType" className="font-medium ml-1">{t('ticketsPage.type')}</label>
                </div>
                <div className='flex items-center text-slate-500 dark:text-slate-100'>
                  <input
                    type="checkbox"
                    name="sort"
                    id="sortUsername"
                    onChange={() => handleSortChange('username')}
                    checked={sortField === 'username'}
                  />
                  <label htmlFor="sortUsername" className="font-medium ml-1">{t('ticketsPage.userName')}</label>
                </div>
                <div className='flex items-center text-slate-500 dark:text-slate-100'>
                  <input
                    type="checkbox"
                    name="sort"
                    id="sortDate"
                    onChange={() => handleSortChange('_created')}
                    checked={sortField === '_created'}
                  />
                  <label htmlFor="sortDate" className="font-medium ml-1">{t('ticketsPage.date')}</label>
                </div>
                <div className='flex items-center text-slate-500 dark:text-slate-100'>
                  <input
                    type="checkbox"
                    name="sort"
                    id="sortPriority"
                    onChange={() => handleSortChange('priority')}
                    checked={sortField === 'priority'}
                  />
                  <label htmlFor="sortPriority" className="font-medium ml-1">{t('ticketsPage.priority')}</label>
                </div>
              </div>
            )}
            <table className="min-w-full">
              <thead>
                <tr className="text-slate-400 dark:text-slate-200 text-left">
                  <th className="py-2 px-4 lg:px-8 border-b dark:border-slate-600">{t('ticketsPage.ticketDetails')}</th>
                  <th className="py-2 px-4 lg:px-8 border-b dark:border-slate-600">{t('ticketsPage.customerName')}</th>
                  <th className="py-2 px-4 lg:px-8 border-b dark:border-slate-600">{t('ticketsPage.date')}</th>
                  <th className="py-2 px-4 lg:px-8 border-b dark:border-slate-600">{t('ticketsPage.priority')}</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td className='px-4 lg:px-8 py-6 font-medium whitespace-normal lg:whitespace-nowrap border-b dark:border-slate-600' colSpan="4">
                      {t('ticketsPage.loading')}
                    </td>
                  </tr>
                )}
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <tr key={ticket._id} className="hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" onClick={() => navigate(`/tikets/${ticket._id}`)}>
                      <td scope="row" className="px-4 lg:px-8 py-6 font-medium whitespace-normal lg:whitespace-nowrap border-b dark:border-slate-600">
                        <p className='font-bold text-xl dark:text-white'>{ticket.type}</p>
                        <div className='text-slate-400' dangerouslySetInnerHTML={{ __html: ticket.post.slice(0, 50) }}></div>
                      </td>
                      <td className="py-6 px-4 lg:px-8 border-b dark:border-slate-600">
                        <p className='font-bold text-xl dark:text-white'>{ticket.username}</p>
                        <p>{formatDate(ticket._created)}</p>
                      </td>
                      <td className="py-6 px-4 lg:px-8 border-b dark:border-slate-600">
                        <p>{formatDateAndTime(ticket._created)}</p>
                      </td>
                      <td className="py-6 px-4 lg:px-8 border-b dark:border-slate-600">
                        <span
                          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                            ticket.priority === 'HIGH' ? 'bg-red-500 text-white' : ''
                          } ${ticket.priority === 'MEDIUM' ? 'bg-yellow-500 text-white' : ''} ${
                            ticket.priority === 'NORMAL' ? 'bg-slate-500 text-white' : ''
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className='px-4 lg:px-8 py-6 font-medium whitespace-normal lg:whitespace-nowrap border-b' colSpan="4">
                      {t('ticketsPage.noTickets')}
                    </td>
                  </tr>
                )}
                <tr className="">
                  <td></td>
                  <td></td>
                  <td className='py-6 px-4 lg:px-8 border-b dark:border-slate-600'>
                    <select className='text-slate-500 dark:text-slate-100 bg-transparent' name="limit" value={limit} onChange={handleLimitChange}>
                      <option value="5" className='text-black'>{t('ticketsPage.limitOptions.5')}</option>
                      <option value="10" className='text-black'>{t('ticketsPage.limitOptions.10')}</option>
                      <option value="25" className='text-black'>{t('ticketsPage.limitOptions.25')}</option>
                      <option value="50" className='text-black'>{t('ticketsPage.limitOptions.50')}</option>
                      <option value="100" className='text-black'>{t('ticketsPage.limitOptions.100')}</option>
                    </select>
                  </td>
                  <td colSpan='2' className='px-4 lg:px-8 py-6 font-medium whitespace-normal lg:whitespace-nowrap border-b dark:border-slate-600 flex justify-center items-center'>
                    <span className='mx-4 text-slate-500 dark:text-white'>{t('ticketsPage.page')} {skip / limit + 1}</span>
                    <button
                      onClick={prev}
                      className='px-4 py-2 text-slate-500 dark:text-white'
                      disabled={skip === 0}
                    >
                      <HiOutlineChevronLeft />
                    </button>
                    <button
                      onClick={next}
                      className='px-4 py-2 text-slate-500 dark:text-white'
                      disabled={tickets.length === 0 || tickets.length < limit}
                    >
                      <HiOutlineChevronRight />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default TicketList;
