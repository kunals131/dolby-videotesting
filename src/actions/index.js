export const setVideo = (state)=>{
    return {
        type : 'SET_VIDEO_STATE',
        payload :state
    }
}
export const setMic = (state)=>{
    return {
        type : 'SET_MIC_STATE',
        payload : state
    }
}
export const setScreenShare = (state)=>{
    return {
        type : 'SET_SCREEN_SHARE_STATE',
        payload : state
    }
}

export const setUser = (user)=>{
    return {
        type : 'SET_USER',
        payload : user
    }
}

export const setConference = (state)=>{
    return {
        type : 'SET_CONFERENCE',
        payload : state
    }
}