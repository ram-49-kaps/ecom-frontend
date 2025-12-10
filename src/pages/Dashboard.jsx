import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import { logout } from "../utils/logout";


export default function Dashboard(){
  const [profile, setProfile] = useState(null);

  const products = [
    {
      id: 1,
      name: "Nike Air Shoes",
      image: "https://www.pexels.com/photo/blurred-night-street-scene-with-moving-bus-in-kyoto-34963352/",
      price: "₹2999"
    },
    {
      id: 2,
      name: "Apple Watch",
      image: "https://www.pexels.com/photo/black-apple-watch-with-black-sports-band-437037/",
      price: "₹15999"
    },
    {
      id: 3,
      name: "MacBook Pro",
      image: "https://www.pexels.com/photo/unlock-the-power-of-apple-gadgets-to-unleash-your-creativity-16150336/",
      price: "₹124999"
    }
  ];

  useEffect(()=>{
    (async ()=>{
      try{ 
        const res = await api.get('/auth/protected'); 
        setProfile(res.data.user); 
      }
      catch(err){ console.error(err); }
    })();
  },[]);

  return (
    <div className="p-6">
      <Navbar />

      {/* Profile Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="backdrop-blur-md bg-white/4 p-4 rounded-lg">
          <h2 className="font-medium">Profile</h2>
          <p className="mt-2">{profile?.name || 'Loading...'}</p>
          <p className="text-sm text-white/70">{profile?.email}</p>
        </div>
        <button 
  onClick={logout}
  className="mt-4 px-4 py-2 bg-red-500/80 hover:bg-red-600 transition rounded-lg text-white"
>
  Logout
</button>


        {/* Store Section */}
        <div className="md:col-span-2 backdrop-blur-md bg-white/4 p-4 rounded-lg">
          <h2 className="font-medium mb-3">Store</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(p => (
              <div key={p.id} className="backdrop-blur-md bg-white/5 p-3 rounded-xl border border-white/5">
                <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-white/70">{p.price}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}
