import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alertSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('/api/users/login', user);
      dispatch(HideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.data);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error('something went wrong');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-3 p-5 border border-gray-300 shadow w-96">
        <h1 className="text-3xl font-bold text-gray-700">Welcome Back</h1>
        <hr />
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
        <button className="primary" onClick={login}>
          Login
        </button>
        <Link className="text-gray-600 underline" to="/register">
          Click Here To Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
