import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import 'materialize-css'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loade';

function App() {
  const {login, logout, userId, firstName, lastName, ready} = useAuth() 
  const isAuthenticated = !!userId 
  const routes = useRoutes(isAuthenticated) 
  if(!ready){
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
     login, logout, userId, firstName, lastName, isAuthenticated,
    }}>
    <Router>
      {isAuthenticated && <Navbar/>}
    <div >
      <div className='container'>
        {routes}
      </div>
    </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
