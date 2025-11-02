import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';
import { Link } from 'react-router-dom';

export default function Posts(){
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages,setTotal] = useState(1);
  const [query,setQuery] = useState('');
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    fetchPosts({ page, limit: 6, q: query }).then(res => {
      setPosts(res.data.posts);
      setTotal(res.data.pages);
    }).catch(err => console.error(err)).finally(()=>setLoading(false));
  },[page, query]);

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search posts..." className="border p-2 flex-1" />
        <button onClick={()=>setPage(1)} className="bg-blue-500 text-white px-3 rounded">Search</button>
      </div>

      {loading ? <div>Loading...</div> : posts.map(p => (
        <div key={p._id} className="mb-4 border rounded p-4">
          <h2 className="text-xl font-bold"><Link to={`/posts/${p._id}`}>{p.title}</Link></h2>
          <p className="text-sm text-gray-600">{p.body.slice(0,200)}...</p>
        </div>
      ))}

      <div className="flex gap-2">
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1 border rounded">Prev</button>
        <div className="px-3 py-1 border">{page} / {totalPages}</div>
        <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  )
}
