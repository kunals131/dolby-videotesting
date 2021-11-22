import React, { useEffect, useState } from 'react'

import { conference, session } from '@voxeet/voxeet-web-sdk';

import Header from '../header/Header'
import MeetingGrid from './MeetingGrid';
import './MeetingView.scss'
import Controller from './Controller';
  


const MeetingView = () => {

    const [participantList, setParticipantList] = useState([]);
    const [background, setBackground] = useState('black');

    const changeBackground = (topic)=>{
        if (topic==='default'){
            setBackground('black') ;
            return;
        }
        const url = `https://source.unsplash.com/1920x1080/?${topic}`
        setBackground(`url(${url}) center center/cover`);
    }
    const StreamUpdatedFunction = (participant, stream)=>{
        console.log('STREAM UPDATED')
        if (stream.type==='screen-share') return;
        const index = participantList.findIndex((ele)=>{
            return ele.id===participant.id;
        })
        if (index===-1) {
            let nameToAdd ='';
            if (session.participant.id===participant.id) {
                nameToAdd = `${participant.info.name} (You)`;
            }
            else {
                nameToAdd = participant.info.name;
            }
            const newParticipantDetails = {
                name : nameToAdd,
                id : participant.id,
                participant : participant,
                stream : stream,
                isVideo : stream.getVideoTracks().length>0,
                isAudio : participant.audio,
                isInactive : false,
            }
            const newList = [...participantList, newParticipantDetails];
            setParticipantList(newList);
        }
        else {
            let participantFromList = participantList[index];
            const updatedDetails = {
                ...participantFromList, stream : stream, isVideo : stream.getVideoTracks().length>0,
                isAudio : true
            }
            const newList = [...participantList];
            newList[index] = updatedDetails;
            setParticipantList(newList);
        }
    }
    
    const streamRemovedFunction = (participant, stream)=>{
        if (participant.status==='Left') return;

        const index = participantList.findIndex(ele=>{
            return ele.id===participant.id;
        })
        const newDetails = {
            name : participant.info.name,
            id : participant.id,
            participant : participant,
            stream : stream,
            isVideo : false,
            isAudio : participant.audio,
            isInactive : true,
        }
        const newList = [...participantList];
        newList[index] = newDetails;
        setParticipantList(newList);
    }

    const participantUpdatedFunction = (participant, stream)=>{
        if (participant.status==='Left') return;

        const newParticipantList = [...participantList].filter((el)=>{
            return  el.id!==participant.id
        })
        setParticipantList(newParticipantList);
    }

    useEffect(()=>{
        conference.on('streamAdded', StreamUpdatedFunction);
        conference.on('streamUpdated', StreamUpdatedFunction);
        conference.on('streamRemoved', streamRemovedFunction);
        conference.on('participantUpdated', participantUpdatedFunction);

        return ()=>{
            conference.off('streamAdded', StreamUpdatedFunction);
            conference.off('streamUpdated', StreamUpdatedFunction);
            conference.off('streamRemoved', streamRemovedFunction);
            conference.off('participantUpdated', participantUpdatedFunction);
        }

    }, [participantList])


    return (
        <div className='meetingview__main' style={{background : background}}>
          <Header user={'kunal Sangtiani'}/>
        <div className="meetingview">
            <div className="meetingview__container">
                <MeetingGrid participants={participantList}></MeetingGrid>
            </div>
            <Controller changeBackground = {changeBackground} participants={participantList}/>
        </div>
        </div>
    )
}

export default MeetingView
