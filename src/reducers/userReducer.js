const userReducer = (user = 'Guest', action) =>{
    if (action.type==='SET_USER') {
        return action.payload;
    }
    else return user;
    
}

export default userReducer