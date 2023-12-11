import { tracksListData } from '../../data/tracks-list';
import { TracksList } from '../../widgets/tracks-list';
import { Search } from '../../components/search';
import { searchTracks } from '../../utils/search-tracks';
import { useState, useEffect } from 'react';
import { AudioProvider } from '../../context/audio-context';

function MainPage() {
  const [tracks, setTracks] = useState(tracksListData);
  const [enteredText, setEnteredText] = useState('');
  const [test, setTest] = useState(6);

  useEffect(() => {
    if (!enteredText) {
      setTracks(tracksListData);
      return;
    }

    const foundTracks = searchTracks(tracksListData, enteredText);

    if (foundTracks.length !== 0) {
      setTracks(foundTracks);
    }
  }, [enteredText]);

  return (
    <AudioProvider>
      <main>
        <Search setEnteredText={setEnteredText} />
        <TracksList dataTraks={tracks} />
      </main>
    </AudioProvider>
  );
}

export { MainPage };
