import axios from "axios";
import {
  DOCUMENT_CREATED,
  GET_DOCUMENTS,
  GET_DOCUMENTS_RECEIVED_ARCHIVED,
  GET_DOCUMENTS_RECEIVED_OPEN,
  GET_ERRORS,
  GET_MY_DOCUMENTS_ARCHIVED,
  GET_MY_DOCUMENTS_OPEN,
  SAVE_SEARCH_DETAILS, UPDATE_SELECTED_USERS_FOR_DOCUMENT_HISTORY
} from "./types";
import {properties} from "../properties.js";
import {ARCHIVE_DOCUMENT_URL, DOCUMENTS_RECEIVED_URL, DOCUMENTS_URL, MY_DOCUMENTS_URL} from "../properties";
import {getSearchParams} from "../utils/documentUtils";

export const createDocument = (document, history) => async dispatch => {
  try {
    if (document.isOriginExternal && document.origin === "") {
      dispatch({
        type: GET_ERRORS,
        payload: {origin: "Câmp obligatoriu"}
      })
    } else {
      const path = properties.serverURL + DOCUMENTS_URL;
      const res = await axios.post(path, document);
      dispatch({
        type: DOCUMENT_CREATED,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    } else {
      alert('Something went wrong');
    }
  }
};

export const getDocuments = searchDetails => async dispatch => {
    const path = properties.serverURL + DOCUMENTS_URL;
    const searchParams = getSearchParams(searchDetails);
    const res = await axios.get(path, { params: searchParams});
    dispatch({
      type: GET_DOCUMENTS,
      payload: res.data
    });
};

export const saveSearchDetails = searchDetails => async dispatch => {
  dispatch({
    type: SAVE_SEARCH_DETAILS,
    payload: searchDetails
  });
}

export const getMyDocuments = archived => async dispatch => {
  const path = properties.serverURL + MY_DOCUMENTS_URL;
  const res = await axios.get(path, { params: {archived: archived}});
  if (archived) {
    dispatch({
      type: GET_MY_DOCUMENTS_ARCHIVED,
      payload: res.data
    });
  }
  else {
    dispatch({
      type: GET_MY_DOCUMENTS_OPEN,
      payload: res.data
    });
  }
};

export const getDocumentsReceived = archived => async dispatch => {
  const path = properties.serverURL + DOCUMENTS_RECEIVED_URL;
  const res = await axios.get(path, { params: {archived: archived}});
  if (archived) {
    dispatch({
      type: GET_DOCUMENTS_RECEIVED_ARCHIVED,
      payload: res.data
    });
  }
  else {
    dispatch({
      type: GET_DOCUMENTS_RECEIVED_OPEN,
      payload: res.data
    });
  }
};

export const archiveDocument = (registryNumber) => async dispatch => {
  const path = properties.serverURL + DOCUMENTS_URL + "/" + registryNumber + ARCHIVE_DOCUMENT_URL;
  await axios.put(path);
  const getMyDocumentsPath = properties.serverURL + MY_DOCUMENTS_URL;
  const resOpen = await axios.get(getMyDocumentsPath, { params: {archived: false}});
  const resArchived = await axios.get(getMyDocumentsPath, { params: {archived: true}});
  dispatch({
    type: GET_MY_DOCUMENTS_OPEN,
    payload: resOpen.data
  });
  dispatch({
    type: GET_MY_DOCUMENTS_ARCHIVED,
    payload: resArchived.data
  })
}