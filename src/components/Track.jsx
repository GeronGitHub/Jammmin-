import React from "react";

function Track({ track, onAdd}){
    return (
        <div>
            <p><strong>{track.name}</strong> - {track.artist} &#124; {track.album}</p>
            {onAdd && (
                <button onClick={() => onAdd(track)}>+</button>
            )}
        </div>
    )
}

export default Track;