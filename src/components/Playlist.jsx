import React from "react";
import Tracklist from "./Tracklist";

function Playlist({ name, tracks}){
    return (
        <div>
            <h2>{name}</h2>
            <Tracklist tracks={tracks}/>
            <button>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;