import React, { useEffect, useState, useCallback } from 'react'
import MeetingView from './videoChat/MeetingView'
import { connect } from 'react-redux'
import { setConference } from './actions'
import { createConference, joinConference } from './utils/VoxeetUtils'
import Home from './Home/Home'


const params = new URLSearchParams(window.location.search);

let meetId = params.get('meetid')
console.log(meetId);


const App = ({ setConference, conf }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
 

    useEffect(() => {
        if (meetId) {
            const createAndJoin = async () => {
                const conference = await createConference(meetId)
                const joiningInfo = await joinConference(conference);
                console.log(joiningInfo)
            }
            createAndJoin();
            const setId = (id)=>{
                setConference(id);
            }
            setId(meetId);
        }
        setIsLoaded(true);
        
    },[])

    if (isLoaded) {
        if (conf) {
            return (
            <MeetingView/>)
        }
        else {
            return <Home/>
        }
    }
    else {
        return 'LOADING ChAT...'
    }



}

const mapStateToProps = (state) => {

    return {
        conf: state.controls.conference
    }
}

export default connect(mapStateToProps, {
    setConference
})(App)
