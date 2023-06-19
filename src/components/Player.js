import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay , faAngleLeft , faAngleRight ,faPause} from '@fortawesome/free-solid-svg-icons';

function Player({currentSong , isPlaying , setIsPlaying , audioRef , time , setTime , songs , setCurrentSong , setSongs}){
    
    // function for format the time
    const timeFormat = (currentTimeFormat)=>{
        const value =  Math.floor(currentTimeFormat / 60) + ":" + ("0" + Math.floor(currentTimeFormat % 60)).slice(-2);
        return value;
       
    }
    
    //  Drag Handler
     const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setTime({...time , currentTime : e.target.value });
     }
    
    const playSongHandler = ()=>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying)
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const skipTrackHandler = async(direction)=>{
      const index = songs.findIndex((song) => song.id === currentSong.id);
      if(direction === 'skip-forward'){
         await setCurrentSong(songs[(index + 1) % songs.length]);
         activeLibraryHandler(songs[(index + 1) % songs.length]);
      }else{
        if((index - 1)%songs.length === -1){
            await setCurrentSong(songs[songs.length-1]);
            activeLibraryHandler(songs[songs.length - 1]);
            return ; 
        }
        await setCurrentSong(songs[(index-1) % songs.length]);
        activeLibraryHandler(songs[(index - 1) % songs.length]);
      }
      if(isPlaying){
        audioRef.current.play();
      }

    }

    const activeLibraryHandler = (nextPrev)=>{
        const newSongs = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true,
                }
            } else {
                return {
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{timeFormat(time.currentTime)} </p>
          
                    <input min={0} max={time.duration | 0} value={time.currentTime} onChange={dragHandler} type="range" />
  
                <p>{time.duration ? timeFormat(time.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={()=> skipTrackHandler('skip-back') }className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={()=> skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
        </div>
    );
}

export default Player;