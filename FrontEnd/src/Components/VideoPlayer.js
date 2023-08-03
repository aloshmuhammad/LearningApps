import React, { useRef } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import { Fullscreen, FullscreenExit, PlayArrow, Pause } from '@mui/icons-material';


const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  const handleExitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  return (
    <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
      <video
        ref={videoRef}
        controls
        style={{ width: '100%', height: 'auto' }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Tooltip title="Play">
          <IconButton onClick={handlePlay}>
            <PlayArrow />
          </IconButton>
        </Tooltip>
        <Tooltip title="Pause">
          <IconButton onClick={handlePause}>
            <Pause />
          </IconButton>
        </Tooltip>
        {document.fullscreenElement ? (
          <Tooltip title="Exit Fullscreen">
            <IconButton onClick={handleExitFullScreen}>
              <FullscreenExit />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Fullscreen">
            <IconButton onClick={handleFullScreen}>
              <Fullscreen />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
