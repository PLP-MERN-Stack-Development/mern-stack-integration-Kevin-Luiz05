import React, { useEffect, useState } from 'react';
import { fetchCategories, createPost, fetchPost, updatePost } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function PostForm({ edit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title:'', body:'', category:'', tags:'', featuredImage:null });

  useEffect(()=> { fetchCategories().then(r=>setCategories(r.data)).catch(console.error); }, []);

  useEffect(()=> {
    if (edit && id) {
      fetchPost(id).then(r=> {
        const p = r.data;
        setForm({ title:p.title, body:p.body, category: p.category ? p.category._id : '', tags: p.tags ? p.tags.join(',') : '', featuredImage:null });
      });
    }
  },[edit, id]);

  async function submit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('body', form.body);
    fd.append('category', form.category);
    fd.append('tags', form.tags);
    if (form.featuredImage) fd.append('featuredImage', form.featuredImage);
    try {
      if (edit) await updatePost(id, fd);
      else await createPost(fd);
      navigate('/');
    } catch(err) { console.error(err); alert('Error'); }
  }

  return (
    <form onSubmit={submit} className="max-w-2xl">
      <div className="mb-2"><input required value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full border p-2" placeholder="Title" /></div>
      <div className="mb-2"><textarea required value={form.body} onChange={e=>setForm({...form, body:e.target.value})} className="w-full border p-2" rows="6" placeholder="Body" /></div>
      <div className="mb-2">
        <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="w-full border p-2">
          <option value="">Select category</option>
          {categories.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>
      <div className="mb-2"><input value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} className="w-full border p-2" placeholder="tags comma separated" /></div>
      <div className="mb-2"><input type="file" onChange={e=>setForm({...form, featuredImage: e.target.files[0]})} /></div>
      <button className="px-3 py-1 bg-primary text-white rounded">{edit ? 'Update' : 'Create'}</button>
    </form>
  );
}
