import style from './index.module.scss';
import { useState, useEffect } from 'react';

function Search({ setEnteredText }) {
  const [searchText, setSearchText] = useState('');

  function handleInput(event) {
    setSearchText(event.target.value);
  }

  useEffect(() => {
    setEnteredText(searchText);
  }, [searchText]);

  return (
    <form className={style.search}>
      <input
        type="text"
        value={searchText}
        onChange={handleInput}
        placeholder="Поиск трека"
      />
    </form>
  );
}

export { Search };
