import React, { useEffect, useState } from 'react';
import { fetchPost, addComment } from '../services/api';
import { useParams } from 'react-router-dom';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({ author:'', content:'' });

  useEffect(()=> {
    fetchPost(id).then(res=>setPost(res.data)).catch(console.error);
  },[id]);

  function submitComment(ev) {
    ev.preventDefault();
    addComment(id, comment).then(res=>setPost(res.data)).catch(console.error);
    setComment({ author:'', content:'' });
  }

  if (!post) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="mb-4">{post.body}</div>
      <h3 className="font-semibold">Comments</h3>
      <ul>
        {post.comments.map((c, idx) => <li key={idx} className="border p-2 my-2">{c.author}: {c.content}</li>)}
      </ul>

      <form onSubmit={submitComment} className="mt-4">
        <input required placeholder="Your name" value={comment.author} onChange={e=>setComment({...comment, author: e.target.value})} className="border p-2 w-full mb-2" />
        <textarea required placeholder="Comment" value={comment.content} onChange={e=>setComment({...comment, content: e.target.value})} className="border p-2 w-full mb-2" />
        <button className="px-3 py-1 bg-primary text-white rounded">Post Comment</button>
      </form>
    </div>
  );
}
