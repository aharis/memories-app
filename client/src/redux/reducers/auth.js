import {AUTH, LOGOUT} from "../actionType";

// export default (state = {user: []}, action) => {
//     switch (action.type) {
//             case AUTH:
//                 return {user: [...state.user,action.payload]};
//                 default:
//                     return state;
//     }
// }

const authReducer = (state = {authData: null}, action) => {
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            console.log(action?.data)
            return {...state, authData: action?.data};
            case LOGOUT:
                localStorage.clear();
                return {...state, authData: null}
            default:
                return state
    }
   
}

export default authReducer;