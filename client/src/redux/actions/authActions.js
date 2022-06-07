import * as api from '../../api/index';
import { AUTH } from "../actionType/index";
//Crud operation

//login
export const signIn = (values, history) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(values)
    dispatch({ type: AUTH, data })
    history.push('/')
  } catch (error) {
    console.log(error)
  }
}
//create
export const signUp = (user, history) => async (dispatch) => {
  try {
    const {data} = await api.createUser(user);
    dispatch({ type: AUTH, data })
    history.push('/')
  } catch (error) {
    console.log(error)
  }
}

