import ReactPlayer from 'react-player';
import './AudioPlayer.css';
import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer({ song }) {
  const [ play, setPlay ] = useState(false);
  const [ time, setTime ] = useState('0:00')
  const [ duration, setDuration ] = useState()
  const playerRef = useRef(null);

  useEffect(() => {
      const currentTime = () => {
        const media = playerRef.current.getCurrentTime()
        const minutes = Math.floor(media/60)
        const seconds = parseInt(media % 60)
        if (playerRef.current && playerRef.current.getCurrentTime() > 0) setTime(`${minutes}:${seconds}`)
      }
      const currentDuration = () => {
        const media = playerRef.current.getDuration()
        const minutes = Math.floor(media/60)
        const seconds = parseInt(media % 60)
        setDuration(`${minutes}:${seconds}`)
      }
      currentTime()
      currentDuration()
  }, [time])

  const togglePlayPause = () => {
    setPlay(!play);
  };

  return (
    <div className='custom-player'>
      <button className='play-button' onClick={togglePlayPause}>
        {play ? <i className='fa-solid fa-pause' />
        : <i className='fa-solid fa-play' />}
      </button>

      <div>
        {song.trackNum}: {song.name}
      </div>
      <div>
        {time} / {duration}
      </div>
      <input
      type='range'
      value={time}

      onChange={e => setTime(e.target.value)}
      ></input>

      <ReactPlayer
        ref={playerRef} // Assigning the ref
        url={song.url}
        controls={true}
        className='player'
        playsinline={true}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
            },
          },
        }}
        width={'37vmin'}
        height={'6vmin'}
      />
    </div>
  );
}
