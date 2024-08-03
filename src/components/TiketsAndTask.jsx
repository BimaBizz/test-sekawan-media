import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { HiOutlineX} from "react-icons/hi";
import { useTranslation } from 'react-i18next';

const TiketsAndTask = (span) => {

  const { t } = useTranslation();

  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({done: false, task: '', tag: 'DEFAULT' });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://admin.bizzcode.site/api/content/items/tasks?sort={"_created":-1}&limit=3', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Api-Key': Cookies.get('SESSION_API'),
          },
        });
        const result = await response.json();
        if (Array.isArray(result)) {
          setTasks(result);
        } else {
          console.error('Tasks is not an array:', result);
          setTasks([]);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [newTask]);

  const handleRadioChange = async (taskId, done, task, tag) => {
    try {
      const response = await fetch(`https://admin.bizzcode.site/api/content/item/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': Cookies.get('SESSION_API'),
        },
        body: JSON.stringify({ "data": { "done": !done, "task": task, "tag": tag } }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://admin.bizzcode.site/api/content/item/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': Cookies.get('SESSION_API'),
        },
        body: JSON.stringify({ data: newTask }),
      });

      if (response.ok) {
        const createdTask = await response.json();
        setTasks((prevTasks) => [createdTask, ...prevTasks]);
        setNewTask({ task: '', tag: 'DEFAULT' });
        setIsModalOpen(false);
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4 px-4 lg:px-12 my-5">
      <div className="w-full bg-white dark:bg-slate-700 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold dark:text-white">{t('tiketTask.unresolvedTickets')}</h2>
          <a href="/tikets" className="text-blue-500">{t('tiketTask.viewDetails')}</a>
        </div>
        <div className="text-sm text-gray-400 mb-2">{t('tiketTask.grup')}</div>
        <ul>
          <li className="flex justify-between py-2 border-b dark:border-slate-400 dark:text-white">
            <span>{t('tiketTask.technicalIssue')}</span>
            <span>{span.techIssue}</span>
          </li>
          <li className="flex justify-between py-2 border-b dark:border-slate-400 dark:text-white">
            <span>{t('tiketTask.refundRequest')}</span>
            <span>{span.refundRequest}</span>
          </li>
          <li className="flex justify-between py-2 border-b dark:border-slate-400 dark:text-white">
            <span>{t('tiketTask.pending')}</span>
            <span>{span.pending}</span>
          </li>
          <li className="flex justify-between py-2 border-b dark:border-slate-400 dark:text-white">
            <span>{t('tiketTask.other')}</span>
            <span>{span.other}</span>
          </li>
        </ul>
      </div>

      <div className="w-full bg-white dark:bg-slate-700 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold dark:text-white">{t('tiketTask.tasks')}</h2>
          <a href="#" className="text-blue-500">{t('tiketTask.viewAll')}</a>
        </div>
        <div className="text-sm text-gray-400 mb-2">{t('home.today')}</div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center text-blue-500 mb-4">
          <span>{t('tiketTask.createNewTask')}</span>
          <span className="ml-2">+</span>
        </button>
        <ul>
          {tasks.map((task) => (
            <li className="flex justify-between items-center py-2 border-b dark:border-slate-400" key={task._id}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="task"
                  className="mr-2"
                  checked={task.done}
                  onChange={() => handleRadioChange(task._id, task.done, task.task, task.tag)}
                />
                <span className="dark:text-white">{task.task}</span>
              </div>
              {task.tag === "DEFAULT" ? (
                <span className="text-xs text-white bg-slate-500 px-2 py-1 rounded">{task.tag}</span>
              ) : task.tag === "NEW" ? (
                <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded">{task.tag}</span>
              ) : task.tag === "URGENT" ? (
                <span className="text-xs text-white bg-yellow-500 px-2 py-1 rounded">{task.tag}</span>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className='fixed left-0 top-0 h-full w-full bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4'>
          <div className='bg-slate-100 p-4 rounded-lg w-full md lg:w-1/4'>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl font-bold'>Create new task</h1>
              <button onClick={() => setIsModalOpen(false)} className='p-2 bg-red-500 rounded-lg text-white'>
                <HiOutlineX className='text-xl'/>
              </button>
            </div>
            <hr className='my-4'/>
            <form onSubmit={handleCreateTask} className='mt-4 space-y-2'>
              <div>
                <label htmlFor="task" className='text-slate-400'>Task</label>
                <input
                  type="text"
                  value={newTask.task}
                  onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                  className='w-full border outline-none border-slate-300 rounded-lg p-2 my-2'
                  required
                />
              </div>
              <div>
                <label htmlFor="tag" className='text-slate-400'>Tag</label>
                <select
                  name="tag"
                  id="tag"
                  value={newTask.tag}
                  onChange={(e) => setNewTask({ ...newTask, tag: e.target.value })}
                  className='w-full border outline-none border-slate-300 rounded-lg p-2 my-2'
                >
                  <option value="DEFAULT">DEFAULT</option>
                  <option value="NEW">NEW</option>
                  <option value="URGENT">URGENT</option>
                </select>
              </div>
              <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TiketsAndTask;
