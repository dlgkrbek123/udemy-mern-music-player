import { useSelector } from 'react-redux';

const SongsList = ({ children }) => {
  const allSongs = useSelector((state) => state.user.allSongs) ?? [];

  return (
    <div className="flex flex-col gap-5">
      <input
        className="w-full rounded"
        type="text"
        placeholder="Song, Artist, Album"
      />
      {allSongs.map((song) => {
        return (
          <div className="flex items-center justify-between">
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
