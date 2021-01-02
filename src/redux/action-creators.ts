import * as types from "./types/actions-types";
import { AppAction } from "./types/actions-types";
import { Image } from "./types/interfaces";
import { Dispatch } from "redux";
import {API_URL} from "./fetch-url";


export const fetchImages = () => (dispatch: Dispatch) => {
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data: Image[]) => dispatch(setImages(data)))
    .catch((error) => {
      dispatch(fetchFailed(error.message));
    });
};

export const fetchFailed = (errMess: string): AppAction => ({
  type: types.FETCH_FAILED,
  payload: errMess,
});

export const setImages = (images: Image[]): AppAction => ({
  type: types.SET_IMAGES,
  payload: images,
});


