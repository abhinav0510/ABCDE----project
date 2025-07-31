import React, { useState } from 'react';
import Login from './screens/login.js';
import Items from './screens/items.js';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!token ? <Login onLogin={handleLogin} /> : <Items token={token} />}
    </div>
  );
}

export default App;