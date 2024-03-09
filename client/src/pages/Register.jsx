import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const register = async () => {
    try {
      const response = await axios.post('/api/users/register', user);

      if (response.data.success) {
        alert('success');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert('catched');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-3 p-5 border border-gray-300 shadow w-96">
        <h1 className="text-3xl font-bold text-gray-700">
          Welcome To Umpotify
        </h1>
        <hr />
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) =>
            setUser((user) => ({ ...user, name: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setUser((user) => ({ ...user, email: e.target.value }))
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser((user) => ({ ...user, password: e.target.value }))
          }
        />
        <button className="primary" onClick={register}>
          Register
        </button>
        <Link to="/login" className="text-gray-600 underline">
          Click Here To Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
