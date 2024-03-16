import { useSelector, useDispatch } from 'react-redux';
import { SetCurrentSong } from '../redux/userSlice';

const SongsList = ({ children }) => {
  const allSongs = useSelector((state) => state.user.allSongs) ?? [];
  const dispatch = useDispatch();

  const handleClickSong = (song) => () => {
    dispatch(SetCurrentSong(song));
  };

  return (
    <div className="flex flex-col gap-5">
      <input
        className="w-full rounded"
        type="text"
        placeholder="Song, Artist, Album"
      />
      {allSongs.map((song) => {
        return (
          <div
            className="flex items-center justify-between"
            onClick={handleClickSong(song)}
          >
            <div>
              <h1>{song.title}</h1>
              <h1>
                {song.artist} {song.album} {song.year}
              </h1>
            </div>
            <div>
              <h1>{song.duration}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SongsList;
