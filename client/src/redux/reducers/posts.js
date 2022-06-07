import {UPDATE, FETCH_ALL,CREATE, DELETE, LIKE, FETCH_BY_SEARCH} from '../actionType/index';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = [], action) => { //posts is state
    switch (action.type) {       
        case DELETE:
            return state.filter(post => post._id !== action.payload)
        case LIKE: // like and update is the same function
        case UPDATE :
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,//posts
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
            
        case FETCH_BY_SEARCH:
            return {...state, posts: action.payload};
        case CREATE:
            return [...state, action.payload.data];
        default:
            return state
    }
}
