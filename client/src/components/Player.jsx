import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { SetCurrentSong, SetCurrentSongIndex } from '../redux/userSlice';

const Player = () => {
  const {
    allSongs,
    currentSong = null,
    currentSongIndex,
  } = useSelector((state) => state.user);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef();
  const dispatch = useDispatch();

  const handleTimeUpdateAudio = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  const handleChangeDuration = (e) => {
    audioRef.current.currentTime = e.target.value;
  };

  const handleChangeVolumeRange = (e) => {
    audioRef.current.volume = e.target.value;
    setVolume(e.target.value);
  };

  const handleClickPause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleClickPlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleClickSkipBack = () => {
    dispatch(SetCurrentSongIndex(currentSongIndex - 1));
    dispatch(SetCurrentSong(allSongs[currentSongIndex - 1]));
  };

  const handleClickSkipForward = () => {
    dispatch(SetCurrentSongIndex(currentSongIndex + 1));
    dispatch(SetCurrentSong(allSongs[currentSongIndex + 1]));
  };

  useEffect(() => {
    if (!currentSong && allSongs.length > 0) {
      dispatch(SetCurrentSongIndex(0));
      dispatch(SetCurrentSong(allSongs[0]));
    }
  }, [allSongs]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSongIndex]);

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

        <div className="flex flex-col items-center w-100">
          <audio
            ref={audioRef}
            src={currentSong?.src}
            onTimeUpdate={handleTimeUpdateAudio}
          />
          <div className="flex gap-3">
            <i
              className="text-4xl ri-skip-back-line"
              onClick={handleClickSkipBack}
            ></i>
            {isPlaying ? (
              <i
                className="text-4xl ri-pause-line"
                onClick={handleClickPause}
              ></i>
            ) : (
              <i
                className="text-4xl ri-play-line"
                onClick={handleClickPlay}
              ></i>
            )}
            <i
              className="text-4xl ri-skip-forward-line"
              onClick={handleClickSkipForward}
            ></i>
          </div>
          <div className="flex items-center w-full gap-3">
            <h1>
              {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
            </h1>
            <input
              type="range"
              className="w-full p-0"
              min={0}
              max={
                !isNaN(audioRef.current?.duration)
                  ? audioRef.current?.duration
                  : Infinity
              }
              value={currentTime}
              onChange={handleChangeDuration}
            />
            <h1>
              {!isNaN(audioRef.current?.duration) &&
                `${Math.floor(audioRef.current?.duration / 60)}:${Math.floor(
                  audioRef.current?.duration % 60
                )}`}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <i
            className="text-3xl ri-volume-mute-line"
            onClick={() => {
              setVolume(0);
              audioRef.current.volume = 0;
            }}
          />
          <input
            type="range"
            className="p-0"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleChangeVolumeRange}
          />
          <i
            className="text-3xl ri-volume-down-line"
            onClick={() => {
              setVolume(1);
              audioRef.current.volume = 1;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
