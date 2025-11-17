import React from "react";
import Tracklist from "./Tracklist";

function Playlist(){
    return (
        <div>
            <h2>My Playlist</h2>
            <button>SAVE TO SPOTIFY</button>
            <Tracklist tracks={[]}/>
        </div>
    )
}

export default Playlist;