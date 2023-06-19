import React from "react";


function Librarysong({ song, songs, audioRef, setCurrentSong, isPlaying ,id , setSongs}) {

    const songSelectHandler = async()=>{
        const selectSong = song;
        await setCurrentSong(selectSong);
        // audioRef.current.play();
        const newSongs = songs.map((song)=>{
            if(song.id === id){
                return {
                    ...song,
                    active:true,
                }
            }else{
                return{
                    ...song,
                    active:false,
                }
            }
        });
        setSongs(newSongs);
        // check if the song is playing
        if (isPlaying) {
            audioRef.current.play();
        }
    }
    return (
        <div onClick={songSelectHandler} className= { `library-song ${song.active ? 'selected' : ''}` }>
            <img alt={song.name} src={song.cover}></img> 
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.singer}</h4>
            </div>
        </div>
    );
}

export default Librarysong;