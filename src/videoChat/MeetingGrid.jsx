import React from 'react'
import ParticipantItem from './ParticipantItem'
import {session} from '@voxeet/voxeet-web-sdk'
import './MeetingGrid.scss'

const MeetingGrid = ({participants}) => {



    return (
        <div className='meetinggrid'>
            <div  className="meetinggrid__container">
                {
                    participants.map((participant)=>(
                        <ParticipantItem key = {participant.id}
                        participant = {participant}
                        isSelf = {participant.id===session.participant.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default MeetingGrid
