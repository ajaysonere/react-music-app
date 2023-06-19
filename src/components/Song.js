import React from "react";

function Song({currentSong}){
    return(
       <div className="song-container">
         <img alt="" src={currentSong.cover}></img>
         <h2>{currentSong.name}</h2>
         <h3>{currentSong.singer}</h3>
       </div>
    );
}

export default Song;