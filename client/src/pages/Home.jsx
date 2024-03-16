import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ShowLoading, HideLoading } from '../redux/alertSlice';
import { SetAllSongs } from '../redux/userSlice';
import toast from 'react-hot-toast';
import SongsList from '../components/SongsList';
import PlayList from '../components/PlayList';

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getAllSongs = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        '/api/songs/get-all-songs',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const { data, message, success } = response.data;

      dispatch(HideLoading());
      if (!success) throw new Error(message);
      dispatch(SetAllSongs(data));
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) getAllSongs();
  }, []);

  return (
    <div className="flex h-screen gap-5">
      <div className="w-1/2">
        <SongsList />
      </div>

      <div className="w-1/2">
        <PlayList />
      </div>
    </div>
  );
};

export default Home;
