import { ConvertSecondsToMmSs } from '../../utils/seconds-to-mm-ss';
import style from './track.module.scss';

function Track(props) {
  const { id, src, preview, duration, title, artists } = props;

  const formattedDuration = ConvertSecondsToMmSs(duration);

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
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
    </svg>
  );

  return (
    <div className={style.trackContainer} id={id}>
      <button type="button" className={style.trackBtn}>
        {iconPlay}
      </button>
      <div className={style.trackPreview}>
        <img src={preview} alt={title} />
      </div>
      <div className={style.trackDesc}>
        <div>
          <p className={style.trackTitle}>{title}</p>
          <p className={style.trackArtist}>{artists}</p>
        </div>
        <div className={style.trackTime}>{formattedDuration}</div>
      </div>
    </div>
  );
}

export { Track };
