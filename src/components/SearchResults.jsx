import React from "react";
import Tracklist from "./Tracklist";

function SearchResults({ tracks }){
    return (
        <div>
            <h2>Results</h2>
            <Tracklist tracks={tracks}/>
        </div>
    )
}

export default SearchResults;