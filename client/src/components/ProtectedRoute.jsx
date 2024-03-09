import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [readyToRender, setReadyToRender] = useState(false);

  const navigate = useNavigate();

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

        if (response.data.success) setReadyToRender(true);
        else throw new Error(response.data.message);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
        console.error(error);
      }
    };

    getUserData();
  }, []);

  return readyToRender ? children : <div>Loading...</div>;
};

export default ProtectedRoute;
