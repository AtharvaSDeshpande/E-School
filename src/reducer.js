export const initialState = {
    user: null,
    selectedClass: null
};
export const actionTypes = {
    SET_USER: "SET_USER",
    SET_CLASS: "SET_CLASS"
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
            console.log(action.selectedClass)
            return {
                    ...state,
                    selectedClass: action.selectedClass,
            }                    
        default:
            return state;
    }
}
export default reducer;