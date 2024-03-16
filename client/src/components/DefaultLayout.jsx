import { useSelector } from 'react-redux';

const DefaultLayout = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const handleClickLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="main">
      <div className="flex items-center justify-between p-5 shadow header">
        <h1 className="text-3xl font-bold text-gray-700">Umpotify</h1>
        <div className="flex items-center gap-2">
          <h1 className="text-xl">{user?.name?.toUpperCase()}</h1>
          <i
            className="text-xl cursor-pointer ri-logout-circle-r-line"
            onClick={handleClickLogout}
          />
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default DefaultLayout;
