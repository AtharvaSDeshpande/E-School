export const initialState = {
    user: null,
    selectedClass: null,
    dashboard: "Home",
    doubtModal: false,
    makeAnnouncement: false,
};
export const actionTypes = {
    SET_USER: "SET_USER",
    SET_CLASS: "SET_CLASS",
    SET_DASHBOARD: "SET_DASHBOARD",
    SET_MODAL: "SET_MODAL",
    SET_ANNOUNCEMENT: "SET_ANNOUNCEMENT",
}

const reducer = (state,action) => {
    switch(action.type)
    {
        case actionTypes.SET_USER:
            return  {
                            ...state,
                            user: action.user,          //  Change the user to what we dispatched
                    };
        case actionTypes.SET_CLASS:
            return {
                    ...state,
                    selectedClass: action.selectedClass,
            }                    
        case actionTypes.SET_DASHBOARD:
            console.log(action.dashboard)
            return {
                    ...state,
                    dashboard: action.dashboard,
            }  
        case actionTypes.SET_MODAL:
            // console.log(action.dashboard)
            return {
                    ...state,
                    doubtModal: action.doubtModal,
            } 
        case actionTypes.SET_ANNOUNCEMENT:
            // console.log(action.dashboard)
            return {
                    ...state,
                    makeAnnouncement: action.makeAnnouncement,
            }                    
        default:
            return state;
    }
}
export default reducer;