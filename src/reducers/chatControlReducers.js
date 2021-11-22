const initialState = {
    video : false,
    mic : true,
    screenShare : false,
    conference : '',

}

 const chatControlReducer =(state = initialState, action)=>{
    switch (action.type) {
        case 'SET_MIC_STATE' : 
            return {...state, mic : action.payload};
        case 'SET_VIDEO_STATE' : 
            return  {...state, video : action.payload};
        case 'SET_SCREEN_SHARE_STATE' : 
            return {...state, screenShare : action.payload};
        case 'SET_CONFERENCE' :
            return {...state, conference : action.payload};
        default : 
            return state;
    }
}
export default chatControlReducer;