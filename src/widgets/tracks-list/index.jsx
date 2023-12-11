import { Track } from '../../components/track/index';
import style from './index.module.scss';

function TracksList({ dataTraks }) {
  return (
    <div className={style.tracksList}>
      <div className={style.trackListContainer}>
        {dataTraks.map((track) => (
          <Track key={track.id} {...track} />
        ))}
      </div>
    </div>
  );
}

export { TracksList };
