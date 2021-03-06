import * as api from '../../api/index';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH } from "../actionType/index";

//Crud operation

export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    dispatch({type: FETCH_BY_SEARCH, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (postData) => async (dispatch) => {
  try {
    const { data } = await api.createPost(postData);
    dispatch({ type: CREATE, payload: data })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  console.log('action')
  try {
    const { data } = await api.updatePost(id, post)
    console.log(data)
    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
};

export const removePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)
    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)
    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error)
  }
}