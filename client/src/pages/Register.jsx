import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const register = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('/api/users/register', user);
      dispatch(HideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      dispatch(HideLoading());
      console.log(error);
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
