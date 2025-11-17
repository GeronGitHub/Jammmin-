import React from "react";

function Track({ track, onAdd, onRemove}){
    return (
        <div>
            <p><strong>{track.name}</strong> - {track.artist} &#124; <i>{track.album}</i></p>
            
            {onAdd && <button onClick={() => onAdd(track)}>+</button>}
            {onRemove && <button onClick={() => onRemove(track)}>-</button>}
        </div>
    )
}

export default Track;