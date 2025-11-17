import React from "react";
import Tracklist from "./Tracklist";

function Playlist({ name, tracks, onRemove }){
    return (
        <div>
            <h2>{name}</h2>
            <Tracklist tracks={tracks} onRemove={onRemove}/>
            <button>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;