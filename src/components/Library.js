import React from "react";
import Librarysong from './Librarysong';

function Library({ songs, setCurrentSong, audioRef, isPlaying , id , setSongs , libraryStatus}){
    return(
         <div className={`library ${libraryStatus ? 'active-library' : ''}`}> 
             <h2>Library </h2>
             <div className="library-songs">
                {songs.map(song => <Librarysong setCurrentSong ={setCurrentSong} songs={songs}  song={song} audioRef={audioRef} isPlaying={isPlaying} id={id}  setSongs={setSongs}/>)}
             </div>
         </div>
    );
}

export default Library;