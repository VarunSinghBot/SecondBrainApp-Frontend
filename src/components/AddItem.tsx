import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddItem() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState('article');
  const [tags, setTags] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized: No token found');
      return;
    }

    // Prepare the payload
    const payload: any = {
      title,
      body,
      type,
      tags: tags.split(',').map(tag => tag.trim()),
    };
    if (type !== 'article') {
      payload.mediaUrl = mediaUrl;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/content',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setSuccess(true);
        setTitle('');
        setBody('');
        setType('article');
        setTags('');
        setMediaUrl('');
        navigate("/main");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add item');
    }
  };

  return (
    <div className='relative flex items-center justify-center min-h-[100dvh] h-fit p-4  bg-[#d9d9d9]'>
      
      <video
    autoPlay
    loop
    muted
    playsInline
    title="Cloud background video"
    aria-hidden="true"
    className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
    style={{
      WebkitMaskImage: 'linear-gradient(to bottom, #ffffff 60%, rgba(0,0,0,0) 100%)',
      maskImage: 'linear-gradient(to bottom, #000000 60%, rgba(0,0,0,0) 100%)',
    }}
  >
    <source src="/cloud-white-bg.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  {/* Black mask at the bottom */}
  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t dark:from-black to-transparent"/>

  {/* Form  */}
    <div className="w-fit flex flex-col items-center justify-start rounded-2xl z-[2] bg-[url(/formBg.svg)] border-2 border-[#ffffff] bg-[#0b0b0b60] bg-cover bg-center h-fit py-14 px-10">
      <form onSubmit={handleSubmit} className="w-[400px] flex flex-col gap-4 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-2">Add New Item</h2>
        <input
          type="text"
          placeholder="Title"
          className="p-2 border rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Body"
          className="p-2 border rounded min-h-[140px]"
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        />
        <select
          className="p-2 border rounded"
          value={type}
          onChange={e => setType(e.target.value)}
          required
        >
          <option value="article">Article</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="image">Image</option>
        </select>
        {/* Show media URL input if type is not article */}
        {type !== 'article' && (
          <input
            type="text"
            placeholder={`Enter ${type} URL`}
            className="p-2 border rounded"
            value={mediaUrl}
            onChange={e => setMediaUrl(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="p-2 border rounded"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        {error && <span className="text-red-500">{error}</span>}
        {success && <span className="text-green-500">Item added successfully!</span>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Item
        </button>
        <button onClick={()=>navigate("/main")} className="border border-[#e1434b] text-[#e1434b] hover:text-white p-2 rounded hover:bg-[#e1434b]">
          Return
        </button>
      </form>
    </div>
    </div>
  );
}
