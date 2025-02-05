import './App.css'
import Home from './home';
import { supabase } from "@/api/client";
import { Login } from "@/components/login";
import { useEffect, useState } from "react";
import { Session } from '@supabase/supabase-js';

function App() {
  const [user, setUser] = useState<Session | null>();

  const getUser = async () => {
    const { data: { session: isLoggedIn } } = await supabase.auth.getSession();
    setUser(isLoggedIn);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h1 className='text-4xl font-semibold'>Simple spend</h1>
      {user ? <Home /> : <Login />}
    </>
  )
}

export default App;
