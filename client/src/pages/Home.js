import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl">home</h1>
      <h1>{user?.name}</h1>
    </div>
  );
};

export default Home;
