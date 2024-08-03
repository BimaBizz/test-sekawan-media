import React, { useState, useEffect } from 'react';
import { HiOutlineX } from "react-icons/hi";
import { Editor } from '@tinymce/tinymce-react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';

const CreateTickets = (props) => {

    const { t } = useTranslation();

    const [open, setIsModalOpen] = useState(props.move);
    const [priority, setPriority] = useState('NORMAL');
    const [type, setType] = useState('Technical issue');
    const [description, setDescription] = useState('');
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const token = Cookies.get('SESSION_DATA');
        if (token) {
        const decoded = jwtDecode(token);
        setProfile(decoded);
        }
    }, [profile]);

    const handleEditorChange = (content) => {
        setDescription(content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ticketData = {
            "data" : {
                "username" : profile.name,
                "priority": priority,
                "type": type,
                "post": description,
                "hold": false,
                "open": false,
                "view": false,
                "overdue": false,
                "solved": false,
                "reject": false,
                "cby": Cookies.get('SESSION_CBY'),
            }
        };

        try {
            const response = await fetch('https://admin.bizzcode.site/api/content/item/tiket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': Cookies.get('SESSION_API'),
                },
                body: JSON.stringify(ticketData),
            });

            if (response.ok) {
                console.log('Ticket created successfully');
                setIsModalOpen(false); // Close the modal on successful submission
                // You can also add a callback to refresh the ticket list if needed
                props.onTicketCreated();
            } else {
                console.error('Failed to create ticket');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={`${open ? 'fixed' : 'hidden'} left-0 top-0 h-full w-full bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4`}>
      <div className='bg-slate-100 p-4 rounded-lg w-full md lg:w-1/2'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-bold'>{t('createTask.title')}</h1>
          <button onClick={() => setIsModalOpen(false)} className='p-2 bg-red-500 rounded-lg text-white'>
            <HiOutlineX className='text-xl'/>
          </button>
        </div>
        <hr className='my-4'/>
        <form onSubmit={handleSubmit} className='mt-4 space-y-2'>
          <div className='flex gap-2 w-full'>
            <div className='w-full'>
              <label htmlFor="priority" className='text-slate-400'>{t('createTask.priorityLabel')}</label>
              <select
                name="priority"
                id="priority"
                className='w-full border outline-none border-slate-300 rounded-lg p-2 my-2'
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="NORMAL">{t('createTask.priorityOptions.NORMAL')}</option>
                <option value="MEDIUM">{t('createTask.priorityOptions.MEDIUM')}</option>
                <option value="HIGH">{t('createTask.priorityOptions.HIGH')}</option>
              </select>
            </div>
            <div className='w-full'>
              <label htmlFor="type" className='text-slate-400'>{t('createTask.typeLabel')}</label>
              <select
                name="type"
                id="type"
                className='w-full border outline-none border-slate-300 rounded-lg p-2 my-2'
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Technical issue">{t('createTask.typeOptions.Technical_issue')}</option>
                <option value="Refund request">{t('createTask.typeOptions.Refund_request')}</option>
                <option value="Pending">{t('createTask.typeOptions.Pending')}</option>
                <option value="Other">{t('createTask.typeOptions.Other')}</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="task" className='text-slate-400 my-2'>{t('createTask.descriptionLabel')}</label>
            <Editor
              apiKey='g6l6xai5ak8ttf5hte3hfc4z8zc3pg4nrtbfk1k30igr9swt'
              init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
          <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg'>{t('createTask.createButton')}</button>
        </form>
      </div>
    </div>
    );
};

export default CreateTickets;
