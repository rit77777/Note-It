import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../api/api';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState('');

  const getNotes = async (token) => {
    const res = await api.get('api/notes', {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem('tokenStore');
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await api.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = '/';
    }
  };

  return (
    <div className='note-wrapper'>
      {notes.map((note) => (
        <div className='card' key={note._id}>
          <h3 title={note.title}>{note.title}</h3>
          <div className='text-wrapper'>
            <p>{note.content}</p>
          </div>
          <p className='date'>{note.date.substring(0, 10)}</p>
          <div className='card-footer'>
            {note.name}
            <Link className='link' to={`edit/${note._id}`}>
              Edit
            </Link>
          </div>
          <button className='close' onClick={() => deleteNote(note._id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
