import React from "react";
import Tracklist from "./Tracklist";

function Playlist({ name, tracks, onRemove, setName }){

    function handleNameChange(event){
        setName(event.target.value);
    }

    return (
        <div>
            <input 
                type="text"
                placeholder="Playlist Name..."
                value={name}
                onChange={handleNameChange} />

            <Tracklist tracks={tracks} onRemove={onRemove}/>

            <button>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;