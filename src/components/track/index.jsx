import { ConvertSecondsToMmSs } from '../../utils/seconds-to-mm-ss';
import style from './index.module.scss';
import { AudioContext } from '../../context/audio-context';
import { useContext } from 'react';

function Track(track) {
  const { id, preview, duration, title, artists } = track;

  const { currentTrack, isPlaying, handleToggleTrack } = useContext(AudioContext);

  const formattedDuration = ConvertSecondsToMmSs(duration);

  const isCurrentTrack = currentTrack.id === id;

  const colorPlays = '#c86efc';
  const colorNotPlays = '#000000';
  const classPlays = isCurrentTrack && isPlaying ? style.trackPlays : colorNotPlays;

  let iconPlay = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="30"
      viewBox="0 -960 960 960"
      width="30"
    >
      <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
    </svg>
  );

  let iconPause = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="29"
      viewBox="0 -960 960 960"
      width="29"
    >
      <path
        fill={isCurrentTrack ? colorPlays : colorNotPlays}
        d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"
      />
    </svg>
  );

  return (
    <div className={style.trackContainer} id={id}>
      <button
        type="button"
        className={style.trackBtn}
        onClick={() => handleToggleTrack(track)}
      >
        {isCurrentTrack && isPlaying ? iconPause : iconPlay}
      </button>
      <div className={style.trackPreview}>
        <img src={preview} alt={title} />
      </div>
      <div className={style.trackDesc}>
        <div>
          <p className={`${style.trackTitle} ${classPlays}`}>{title}</p>
          <p className={`${style.trackArtist} ${classPlays}`}>{artists}</p>
        </div>
        <div className={`${style.trackTime} ${classPlays}`}>{formattedDuration}</div>
      </div>
    </div>
  );
}

export { Track };
