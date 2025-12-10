import React, { useState } from 'react'
import api from '../api/axios'
import { useNavigate, Link } from 'react-router-dom'
import Spinner from '../components/spinner'
import { pushToast } from '../components/Toast'

export default function Signup(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onChange = (e) => setForm(s=>({...s,[e.target.name]: e.target.value}));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await api.post('/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      pushToast(`Welcome, ${res.data.user.name} 👋`);
      nav('/dashboard');
    }catch(err){ pushToast(err?.response?.data?.message||'Signup failed'); }
    finally{ setLoading(false); }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/4 border border-white/6">
        <h2 className="text-2xl font-semibold mb-4">Create account</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={onChange} required placeholder="Full name" className="w-full p-3 rounded-lg bg-white/6 outline-none focus:ring-2 focus:ring-blue-300" />
<input 
  name="email" 
  value={form.email}
  onChange={onChange}
  required
  placeholder="Email"
  className="w-full p-3 rounded-lg bg-white/6 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-300"
/>
          <input name="password" value={form.password} onChange={onChange} type="password" required placeholder="Password" className="w-full p-3 rounded-lg bg-white/6 outline-none focus:ring-2 focus:ring-blue-300" />
          <button type="submit" className="w-full p-3 rounded-lg bg-gradient-to-r from-green-400 to-teal-400 font-semibold">
            {loading ? <div className="flex items-center justify-center gap-2"><Spinner size={18}/> Creating...</div> : 'Sign up'}
          </button>
        </form>
        <p className="mt-4 text-sm">Already have an account? <Link to="/" className="text-blue-300">Login</Link></p>
      </div>
    </div>
  )
}
