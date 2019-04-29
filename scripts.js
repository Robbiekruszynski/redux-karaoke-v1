// LYRIC INFO
const songLyricsArray = "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', ');

// INITIAL REDUX STATE
const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
}

// REDUX REDUCER
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'NEXT_LYRIC':
      let newArrayPosition = state.arrayPosition + 1;
      newState = {
        songLyricsArray: state.songLyricsArray,
        arrayPosition: newArrayPosition,
      }
      return newState;
    case 'RESTART_SONG':
      newState = initialState;
      return newState;
    default:
      return state;
  }
}

// JEST TESTS + SETUP
const { expect } = window;

expect(reducer(initialState, { type: null })).toEqual(initialState);

expect(reducer(initialState, { type: 'NEXT_LYRIC' })).toEqual({
  songLyricsArray: songLyricsArray,
  arrayPosition: 1
});

expect(reducer({
    songLyricsArray: songLyricsArray,
    arrayPosition: 1,
  },
  { type: 'RESTART_SONG' })
).toEqual(initialState);

// REDUX STORE
const { createStore } = Redux;
const store = createStore(reducer);

// RENDERING STATE IN DOM
const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  const renderSongs = () => {

    // Retrieves songsById state slice from store:
    const songsById = store.getState().songsById;

    // Cycles through each key in songsById:
    for (const songKey in songsById) {

      // Locates song corresponding with each key, saves as 'song' constant:
      const song = songsById[songKey]

      // Creates <li>, <h3>, and <em> HTMl elements to render this song's
      // information in the DOM:
      const li = document.createElement('li');
      const h3 = document.createElement('h3');
      const em = document.createElement('em');

      // Creates text node containing each song's title:
      const songTitle = document.createTextNode(song.title);

      // Creates text node containing each song's artist:
      const songArtist = document.createTextNode(' by ' + song.artist);

      // Adds songTitle text node to the <em> element we created 3 lines up:
      em.appendChild(songTitle);

      // Adds <em> element that now contains song title to <h3> element created
      // 5 lines up:
      h3.appendChild(em);

      // Also adds songArtist text node created 2 lines up to <h3> element created
      // 6 lines up:
      h3.appendChild(songArtist);

      // Adds click event listener to same  <h3> element, when this <h3> is clicked,
      // an event handler called selectSong() will run, using song's ID as argument:
      h3.addEventListener('click', function() {
        selectSong(song.songId);
      });

      // Adds entire <h3> element to the <li> element created 11 lines above:
      li.appendChild(h3);

      // Appends this <li> element to the <ul> in index.html with a 'songs' ID:
      document.getElementById('songs').appendChild(li);
    }
  }

  const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
  const renderedLine = document.createTextNode(currentLine);
  document.getElementById('lyrics').appendChild(renderedLine);
}

window.onload = function() {
  // renderSongs();
  renderLyrics();
}

// CLICK LISTENER
const userClick = () => {
  if (store.getState().arrayPosition === store.getState().songLyricsArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG' } );
  } else {
    store.dispatch({ type: 'NEXT_LYRIC' } );
  }
}

// SUBSCRIBE TO REDUX STORE
store.subscribe(renderLyrics);
