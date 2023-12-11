import { tracksListData } from '../../data/tracks-list';
import { TracksList } from '../../widgets/tracks-list';
import { Search } from '../../components/search';
import { searchTracks } from '../../utils/search-tracks';
import { useState, useEffect } from 'react';

function MainPage() {
  const [tracks, setTracks] = useState(tracksListData);
  const [enteredText, setEnteredText] = useState('');

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
    <main>
      <Search setEnteredText={setEnteredText} />
      <TracksList dataTraks={tracks} />
    </main>
  );
}

export { MainPage };
