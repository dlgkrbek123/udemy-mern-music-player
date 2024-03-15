import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SetUser } from '../redux/userSlice';
import { ShowLoading, HideLoading } from '../redux/alertSlice';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const [readyToRender, setReadyToRender] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      dispatch(ShowLoading());

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
        dispatch(HideLoading());
      } catch (error) {
        localStorage.removeItem('token');
        dispatch(HideLoading());
        navigate('/login');
        console.error(error);
      }
    };

    if (user === null) getUserData();
  }, []);

  return readyToRender && children;
};

export default ProtectedRoute;
