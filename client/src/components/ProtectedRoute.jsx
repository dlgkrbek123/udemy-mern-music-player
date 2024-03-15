import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SetUser } from '../redux/userSlice';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const [readyToRender, setReadyToRender] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.post(
          '/api/users/get-user-data',
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
            },
          }
        );

        if (response.data.success) {
          dispatch(SetUser(response.data.data));
        } else throw new Error(response.data.message);

        setReadyToRender(true);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
        console.error(error);
      }
    };

    if (user === null) getUserData();
  }, []);

  return readyToRender ? children : <div>Loading...</div>;
};

export default ProtectedRoute;
