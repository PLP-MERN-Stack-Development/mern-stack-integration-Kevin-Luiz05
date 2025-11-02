import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="mb-6 p-4 bg-gray-100 rounded">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className="font-bold mr-4">MERN Blog</Link>
          <Link to="/" className="mr-2">Posts</Link>
          <Link to="/posts/new">New Post</Link>
        </div>
        <div>
          {user ? (
            <>
              <span className="mr-2">Hello, {user.name}</span>
              <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
