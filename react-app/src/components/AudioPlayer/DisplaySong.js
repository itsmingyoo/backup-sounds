import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./AudioPlayer.css";

function DisplaySong({
  currentSong,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
  currentlyPlaying,
}) {
  const [loadedMetaData, setLoadedMetaData] = useState(false);
  const song = useSelector((s) => s.songs.CurrentlyPlaying);
  // NOTE * Anytime youre setting a new state that is imported as a prop 'setState' for example here, you must use it in a useEffect else you will get warnings in the dev console.
  useEffect(() => {
    if (loadedMetaData) {
      const seconds = audioRef.current.duration;
      setDuration(seconds);
      progressBarRef.current.max = seconds;
    }
  }, [loadedMetaData]);

  const metaData = () => {
    if (loadedMetaData === false) setLoadedMetaData(true);
  };

  if (
    !audioRef ||
    !progressBarRef ||
    currentlyPlaying === undefined ||
    Object.values(currentlyPlaying).length === 0
  )
    return null;
  return (
    <div className="display-song__main-container">
      <div className="display-song__container">
        {/* AUDIO PLAYER */}
        <audio
          src={currentlyPlaying?.songURL}
          ref={audioRef}
          onLoadedMetadata={metaData} // onLoadedMeta data is an event on the <audio /> which will help us display the track duration as soon as the audio metadata loads
          onEnded={() => handleNext()}
        />
        {/* THUMBNAIL */}
        <div className="audio-info">
          <div className="audio-image">
            {currentlyPlaying.thumbnail ? (
              <img src={currentlyPlaying.thumbnail} alt="audio thumb" />
            ) : (
              <div className="icon-container">
                <span className="audio-icon">{/* insert icon here */}</span>
              </div>
            )}
          </div>
        </div>
        {/* TITLE */}
        <div className="audio-text">
          <span className="displayName">
            {currentlyPlaying.artistInfo.displayName}
          </span>
          <span className="title">{currentlyPlaying.title}</span>
        </div>
      </div>
    </div>
  );
}
export default DisplaySong;
