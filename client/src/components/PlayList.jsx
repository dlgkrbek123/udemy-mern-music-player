import { useSelector } from 'react-redux';
import axios from 'axios';

const PlayList = ({ children }) => {
  const allSongs = useSelector((state) => state.user.allSongs) ?? [];

  return <div className="">playlist</div>;
};

export default PlayList;
