import { createContext, useReducer } from "react"

const initialState = {
    userId: 0,
    userName: null,
    userEmail: null
}

export const UserContext = createContext(initialState)
export const UserProvider = ( { children } ) =>{
    const [state, dispatch] = useReducer( (state, action) => {
        const currentState = { ...state }
        switch(action.type) {
            case "SET_USER":
                currentState.userId = action.payload.userId
                currentState.userName = action.payload.userName
                currentState.userEmail = action.payload.userEmail
                return currentState
            case "LOGOUT":
                currentState.userName = null
                currentState.userEmail = null
                return currentState
            default:
                throw new Error()       
        }
    }, initialState)
    return <UserContext.Provider value={ {state, dispatch} }>{children}</UserContext.Provider>
};
