import { useState, useRef, useEffect } from "react";

export default function AudioPlayer({ song }) {
  //state
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  //references
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = parseInt(secs % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue); // Use functional form of setState
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const changePlayerTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setTime(progressBar.current.value);
  };
  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime
      ? audioPlayer.current.currentTime
      : 0;
    changePlayerTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };
  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value
      ? progressBar.current.value
      : 0;
    changePlayerTime();
  };

  return (
    <div className="flex flex-row items-center">
      <button
        className={`rounded-md w-20 aspect-square my-2 mr-2 bg-gradient-to-b transition duration-200 ease-in-out text-2xl active:scale-90 text-shadow ${
          !isPlaying
            ? "from-slate-300 to-slate-700"
            : "to-slate-300  from-slate-700"
        }`}
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <i className="fa-solid fa-pause" />
        ) : (
          <i className="fa-solid fa-play" />
        )}
      </button>

      <div>
        <div>
          {song.trackNum}: {song.name}
        </div>
        <input
          type="range"
          ref={progressBar}
          className="progress-bar"
          defaultValue={0}
          value={time}
          onChange={changeRange}
        ></input>
        <p className="text-center">
          {calculateTime(time)} / {calculateTime(duration)}
        </p>
        <audio src={song.url} ref={audioPlayer}>
          {" "}
        </audio>
      </div>
    </div>
  );
}
