import { useSelector, useDispatch } from 'react-redux';
import { SetCurrentSong, SetCurrentSongIndex } from '../redux/userSlice';

const SongsList = ({ children }) => {
  const { allSongs = [], currentSong } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClickSong = (song, index) => () => {
    dispatch(SetCurrentSong(song));
    dispatch(SetCurrentSongIndex(index));
  };

  return (
    <div className="flex flex-col gap-5">
      <input
        className="w-full rounded"
        type="text"
        placeholder="Song, Artist, Album"
      />
      {allSongs.map((song, index) => {
        const isCurrentSong = currentSong?._id === song._id;

        return (
          <div
            key={song._id}
            className={`p-2 flex items-center justify-between cursor-pointer ${
              isCurrentSong && 'shadow border border-gray-300 rounded'
            }`}
            onClick={handleClickSong(song, index)}
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
