import React, { useEffect, useState } from 'react'
let _push = null;
export function pushToast(msg){ if (_push) _push(msg); }
export default function Toast(){
  const [msg, setMsg] = useState(null);
  useEffect(()=>{ _push = (m)=>{ setMsg(m); setTimeout(()=>setMsg(null), 3200) } },[]);
  if (!msg) return null;
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="backdrop-blur-md bg-white/6 border border-white/8 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center bg-white/8 rounded-full">{msg[0]}</div>
        <div className="font-medium">{msg}</div>
      </div>
    </div>
  )
}
