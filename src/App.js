import React,{useState , useRef} from 'react';
// importing style
import './style/App.scss'
// importing components
import Player from './components/Player.js';
import Song from './components/Song.js';
import Library from './components/Library.js';
import Nav from './components/Nav';

// import data
import data from './Data';

function App() {
  const [songs , setSongs] = useState(data());
  const [currentSong , setCurrentSong] = useState(songs[0]);
  const [isPlaying , setIsPlaying] = useState(false);
  // state for managing the time
  const [time, setTime] = useState({
    currentTime: 0,
    duration: 0,
  });

  // for getting the start and duration of music
  const timeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // console.log(duration);
    // console.log(current);
    setTime({ ...time, currentTime: current, duration: duration });

  }
  // library status
  const[libraryStatus , setLibraryStatus] = useState(false);

  const songEndHandler = async()=>{
    const index = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(index + 1) % songs.length]);

    if(isPlaying) audioRef.current.play();
  };

  const audioRef = useRef(null);
  return (
    <div className={`${libraryStatus?'library-active': ''}`}> 
       <Nav libraryStatus={libraryStatus}
            setLibraryStatus = {setLibraryStatus}
       />
       <Song currentSong = {currentSong} />

       <Player audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong = {currentSong} time={time} setTime={setTime} songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs} />


       <Library audioRef={audioRef} songs={songs} setCurrentSong = {setCurrentSong} isPlaying={isPlaying} id={currentSong.id} setSongs={setSongs} libraryStatus={libraryStatus}/> 


       <audio onLoadedMetadata={timeHandler} onTimeUpdate={timeHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler} ></audio>

    </div>
  );
}

export default App;
