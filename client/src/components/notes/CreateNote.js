import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../api/api';

export default function CreateNote() {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
  });
  const history = useHistory();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const { title, content, date } = note;
        const newNote = {
          title,
          content,
          date,
        };

        await api.post('/api/notes', newNote, {
          headers: { Authorization: token },
        });

        toast.dark('💾 Notes Created', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return history.push('/');
      }
    } catch (err) {
      window.location.href = '/';
    }
  };

  return (
    <div className='create-note'>
      <h2>Create Note</h2>
      <form onSubmit={createNote} autoComplete='off'>
        <div className='row'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            value={note.title}
            id='title'
            name='title'
            required
            onChange={onChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='content'>Content</label>
          <textarea
            type='text'
            value={note.content}
            id='content'
            name='content'
            required
            rows='10'
            onChange={onChangeInput}
          />
        </div>

        <label htmlFor='date'>Date: {note.date} </label>
        <div className='row'>
          <input
            type='date'
            id='date'
            name='date'
            onChange={onChangeInput}
            required
          />
        </div>

        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
