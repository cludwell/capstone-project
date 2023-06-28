import ReactPlayer from 'react-player';
import './AudioPlayer.css';
import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer({ song }) {
    //state
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ time, setTime ] = useState(0)
    const [ duration, setDuration ] = useState(0)

    //references
    const audioPlayer = useRef();
    const progressBar = useRef();
    const animationRef = useRef();

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs/60)
        const seconds = parseInt(secs % 60)
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
    
    const togglePlayPause = () => {
        const prevValue = isPlaying
        setIsPlaying(!prevValue); // Use functional form of setState
        if (!prevValue) {
            audioPlayer.current.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause()
            cancelAnimationFrame(animationRef.current)
        }
    };

    const changePlayerTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setTime(progressBar.current.value)
    }
    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerTime()
        animationRef.current = requestAnimationFrame(whilePlaying)
    }
    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerTime();
    }

  return (
    <div className='custom-player'>
      <button className='play-button' onClick={togglePlayPause}>
        {isPlaying ? <i className='fa-solid fa-pause' />
        : <i className='fa-solid fa-play' />}
      </button>

    <div>
        <div>{song.trackNum}: {song.name}</div>
        <input
        type='range'
        ref={progressBar}
        defaultValue={0}
        value={time}
        onChange={changeRange}
        ></input>
        <span>
            {calculateTime(time)} / {calculateTime(duration)}
        </span>
        <audio src={song.url} ref={audioPlayer}> </audio>
    </div>
    </div>
  );
}
