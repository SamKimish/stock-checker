import axios from "axios";
import {
  GET_ERRORS,
  GET_USER_ITEMS,
  ITEMS_LOADING
} from "./types";
export const getItems = (userId) => dispatch => {
  const url = "/api/users/" + userId + "/items"  
  axios.get(url).then(res => {
    const { data } = res.data;
    localStorage.setItem("items", data);
    // Set current user
    console.log(data);
    dispatch(setItems(data))
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err
    })
  })
  dispatch(setItemsLoading());
};

export const setNewItem = (userId, itemData) => dispatch => {
    const url = "/api/users/" + userId + "/items";
    axios
      .post(url, itemData)
      .then(res => {
        const { data } = res.data;
        localStorage.setItem("items", data);
        // Set current user
        dispatch(setItems(data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
  };

export const deleteItem = (userId, products) => dispatch => {
    const url = "/api/users/" + userId + "/items";
    console.log(products);
    axios
      .delete(url, {
            data: {
                products
            }
        })
      .then(res => {
        const { data } = res.data;
        localStorage.setItem("items", data);
        // Set current user
        dispatch(setItems(data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

// Set logged in user
export const setItems = item => {
  return {
    type: GET_USER_ITEMS,
    payload: item
  };
};
// User loading
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
