import style from './index.module.scss';
import { ConvertSecondsToMmSs } from '../../utils/seconds-to-mm-ss';
import { useContext, useEffect, useState } from 'react';
import { AudioContext } from '../../context/audio-context';

function Playbar() {
  const { currentTrack, isPlaying, handleToggleTrack, audio } = useContext(AudioContext);

  let iconPlay = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="40"
      viewBox="0 -960 960 960"
      width="40"
    >
      <path
        fill="#ffffff"
        d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"
      />
    </svg>
  );

  let iconPause = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="40"
      viewBox="0 -960 960 960"
      width="40"
    >
      <path
        fill="#ffffff"
        d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"
      />
    </svg>
  );

  return (
    <div className={style.playbar} id={currentTrack.id}>
      <div className={style.playbarPreview}>
        <img src={currentTrack.preview} alt={currentTrack.title} />
      </div>
      <button
        type="button"
        className={style.playbarBtn}
        onClick={() => {
          handleToggleTrack(currentTrack);
        }}
      >
        {isPlaying ? iconPause : iconPlay}
      </button>
      <div className={style.playbarDesc}>
        <p className={style.playbarTitle}>{currentTrack.title}</p>
        <p className={style.playbarArtist}>{currentTrack.artists}</p>
      </div>
      <TimeControls />
    </div>
  );
}

function TimeControls() {
  const { currentTrack, audio } = useContext(AudioContext);
  const [currentTime, setCurrentTime] = useState(0);

  const formattedCurrentTime = ConvertSecondsToMmSs(currentTime);
  const durationTime = ConvertSecondsToMmSs(currentTrack.duration);

  const { duration } = currentTrack;

  const sliderCurrentTime = Math.round((currentTime / duration) * 100);

  function handleChangeCurrentTime(event) {
    const time = Math.round((event.target.value / 100) * duration);

    setCurrentTime(time);
    audio.currentTime = time;
  }

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className={style.playbarControls}>
      <div className={`${style.playbarTime} ${style.playbarCurrentTime}`}>
        {formattedCurrentTime}
      </div>
      <div className={style.playbarRange}>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={sliderCurrentTime}
          onChange={handleChangeCurrentTime}
        />
      </div>
      <div className={`${style.playbarTime} ${style.playbarDurationTime}`}>
        {durationTime}
      </div>
    </div>
  );
}

export { Playbar };
