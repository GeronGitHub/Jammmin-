import React from "react";

function Track({ name, artist, album}){
    return (
        <div>
            <p>
                <strong>{name}</strong> - {artist} &#40;{album}&#41;
            </p>
            <button>+</button>
        </div>
    )
}

export default Track;