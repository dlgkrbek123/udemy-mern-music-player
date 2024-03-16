import { useSelector } from 'react-redux';
import axios from 'axios';

const Player = ({ children }) => {
  const { currentSong = null } = useSelector((state) => state.user);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-5 bg-gray-100 border shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img className="w-[200px]" src="/images/player-left.webp" alt="" />
          {currentSong && (
            <div className="">
              <h1>{currentSong?.title}</h1>
              <h1>
                {currentSong?.artist} / {currentSong?.album} /{' '}
                {currentSong?.year}
              </h1>
            </div>
          )}
        </div>

        <div className="">
          <audio src="" controls></audio>
        </div>

        <div className="">
          <h1>Volume</h1>
        </div>
      </div>
    </div>
  );
};

export default Player;
