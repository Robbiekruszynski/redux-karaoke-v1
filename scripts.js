// LYRIC INFO
const songLyricsArray = "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', ');

// INITIAL REDUX STATE
const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
}

// REDUX REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_LYRIC':
      let newArrayPosition = state.arrayPosition + 1;
      let newState = {
        songLyricsArray: state.songLyricsArray,
        arrayPosition: newArrayPosition,
      }
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

// REDUX STORE
const { createStore } = Redux;
const store = createStore(reducer);
console.log(store.getState());

// RENDERING STATE IN DOM
const renderLyrics = () => {
// defines a lyricsDisplay constant referring to the div with a 'lyrics' ID in index.html
const lyricsDisplay = document.getElementById('lyrics');
// if there are already lyrics in this div, remove them one-by-one until it is empty:
while (lyricsDisplay.firstChild) {
  lyricsDisplay.removeChild(lyricsDisplay.firstChild);
}
// Locates the song lyric at the current arrayPosition:
const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
// Creates DOM text node containing the song lyric identified in line above:
const renderedLine = document.createTextNode(currentLine);
// Adds text node created in line above to 'lyrics' div in DOM
document.getElementById('lyrics').appendChild(renderedLine);
}

// runs renderLyrics() method from above when page is finished loading.
// window.onload is HTML5 version of jQuery's $(document).ready()
window.onload = function() {
renderLyrics();
}

// CLICK LISTENER
const userClick = () => {
  console.log('click');
  store.dispatch({ type: 'NEXT_LYRIC'} );
}

// SUBSCRIBE TO REDUX STORE
store.subscribe(renderLyrics);
