import React from 'react'
import Router from './router'
import Toast from './components/Toast'

export default function App(){
  return (
    <div className="min-h-screen text-slate-100">
      <Router />
      <Toast />
    </div>
  )
}
