function searchTracks(data, enteredText) {
  const lowerCaseEnteredText = enteredText.toLowerCase();

  const foundTracks = data.filter(
    (track) =>
      track.title.toLowerCase().includes(lowerCaseEnteredText) ||
      track.artists.toLowerCase().includes(lowerCaseEnteredText)
  );

  return foundTracks;
}

export { searchTracks };
