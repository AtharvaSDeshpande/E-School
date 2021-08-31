export const initialState = {
    user: null,
    selectedClass: null,
    dashboard: "Home",
};
export const actionTypes = {
    SET_USER: "SET_USER",
    SET_CLASS: "SET_CLASS",
    SET_DASHBOARD: "SET_DASHBOARD",
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
        default:
            return state;
    }
}
export default reducer;