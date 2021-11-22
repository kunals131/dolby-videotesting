
import React, { useEffect, useRef, useCallback } from 'react'
import './ParticipantItem.scss'


const ParticipantItem = ({participant, isSelf}) => {
    const ref = useRef();
    const {id, stream, isVideo, } = participant;
    const videoRef = useRef();

    const setupVideo = useCallback(({ stream }) => {
        navigator.attachMediaStream(videoRef.current, stream);
      }, []);
    
      // watcher for stream
      useEffect(() => {
        if (stream) {
          setupVideo({ stream });
        }
      }, [isVideo, stream, ref, id, setupVideo]);
    
    return (
        <div className='participantItem' ref = {ref}>
            {stream ? (
        <video
          id="video-object"
          className="participant-grid-item__video"
          ref={videoRef}
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          playsInline
          autoPlay
          muted
        />
      ) : null}
        </div>
    )
}

export default ParticipantItem
