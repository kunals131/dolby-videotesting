import React, { useState } from 'react'
import { Button } from '@mui/material'
import { connect } from 'react-redux'
import { TextField } from '@mui/material'
import { setConference } from '../actions'
import { createConference, joinConference } from '../utils/VoxeetUtils'

import './Home.scss'
const textFieldStyle ={
    borderColor : 'white',
    width : '60%',
    color : 'white',
}

const ButtonStyle ={
    backgroundColor : 'white',
    color : 'black'
}

const Home = ({setConference}) => {
    const [input, setInput] = useState('');
    const [isLoaded, setIsLoaded] = useState(true);
    const conferenceCreation = async ()=>{
        setIsLoaded(false);
        const id = input || `testing`;
        const conf = await createConference(id)
        const joiningInfo = await joinConference(conf);
        setIsLoaded(true);
        setConference(id);
        console.log(joiningInfo)

    }
    return (
        <> {
        isLoaded?
        <div className='Home'>
            <div className="Home__content">
            
            <h1 className="Home__heading">Dolby Version One Conference</h1>
            <div className="Home__inputs">
                <p>Enter Meet id to join or</p>
                <div className="Home__inputs-name">
                    <TextField style={textFieldStyle} type="text" label= "Your Name?" onChange={(e)=>setInput(e.target.value)} value={input} variant="outlined"/>
                </div>
                <div className="Home__inputs-name">
                    <p>directly hit button to start confernece</p>
                    <Button style={ButtonStyle} variant="contained" onClick={conferenceCreation}>Create Conference</Button>
                </div>
            </div>
                
            </div>
        </div> : 'LOADING VIDEO...'
}
        </>
    )
}



export default connect(null, {
    setConference
})(Home)
