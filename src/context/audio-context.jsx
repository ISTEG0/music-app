import { createContext } from 'react';
import { tracksListData } from '../data/tracks-list';
import { useState } from 'react';

const defaultTrack = tracksListData[0];

const audio = new Audio(defaultTrack.src);

const AudioContext = createContext(1);

function AudioProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(defaultTrack);
  const [isPlaying, setPlaying] = useState(false);

  function changeStateIsPlaying() {
    setPlaying(false);
    audio.removeEventListener('ended', changeStateIsPlaying);
  }

  function listenerAudioEnded() {
    audio.removeEventListener('ended', changeStateIsPlaying);
    audio.addEventListener('ended', changeStateIsPlaying);
  }

  function handleToggleTrack(dataTrack) {
    if (currentTrack.id !== dataTrack.id) {
      setCurrentTrack(dataTrack);
      setPlaying(true);

      audio.src = dataTrack.src;
      audio.currentTime = 0;
      audio.play();
      listenerAudioEnded();

      return;
    }

    if (isPlaying) {
      audio.pause();
      setPlaying(false);

      audio.removeEventListener('ended', changeStateIsPlaying);
    } else {
      audio.play();
      setPlaying(true);

      listenerAudioEnded();
    }
  }

  const valueForTrack = { currentTrack, isPlaying, handleToggleTrack, audio };

  return <AudioContext.Provider value={valueForTrack}>{children}</AudioContext.Provider>;
}

export { AudioContext, AudioProvider };
