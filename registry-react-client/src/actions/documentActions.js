import axios from "axios";
import {
  DOCUMENT_CREATED,
  GET_DOCUMENTS,
  GET_DOCUMENTS_RECEIVED_ARCHIVED,
  GET_DOCUMENTS_RECEIVED_OPEN,
  GET_DOCUMENTS_RECEIVED_RESOLVED,
  GET_ERRORS,
  GET_MY_DOCUMENTS_ARCHIVED,
  GET_MY_DOCUMENTS_OPEN,
  SAVE_SEARCH_DETAILS
} from "./types";
import {properties} from "../properties.js";
import {
  ARCHIVE_DOCUMENT_URL,
  DOCUMENTS_RECEIVED_ARCHIVED_URL,
  DOCUMENTS_RECEIVED_URL,
  DOCUMENTS_URL,
  MY_DOCUMENTS_URL,
  PAGE_COUNT_PATH,
  RESOLVE_DOCUMENT_URL
} from "../properties";
import {getSearchParams} from "../utils/documentSearchUtils";

let searchId = 0;

export const createDocument = document => async dispatch => {
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

export const getDocuments = (searchDetails, pageNumber) => async dispatch => {
  searchId++;

  console.log("getDocuments called with searchParam", searchDetails.searchStr);
  const path = properties.serverURL + DOCUMENTS_URL;
  const searchParams = new URLSearchParams(getSearchParams(searchDetails, pageNumber, searchId));
  const res = await axios.get(path, {params: searchParams});

  const pageCountPath = path + PAGE_COUNT_PATH;
  const pageCountRes = await axios.get(pageCountPath, {params: searchParams});

  console.log("res data searchId: " + res.data.searchId + "; current searchId: " + searchId)
  if (res.data.searchId >= searchId) {
    console.log("updating reducer list")
    dispatch({
      type: GET_DOCUMENTS,
      payload: {documentList: res.data.documents, pageCount: pageCountRes.data}
    });
  }
};


export const getMyDocuments = (archived, pageNumber) => async dispatch => {
  const path = properties.serverURL + MY_DOCUMENTS_URL;
  const res = await axios.get(path, {params: {archived: archived, page: pageNumber}});

  const pageCountPath = path + PAGE_COUNT_PATH;
  const pageCountRes = await axios.get(pageCountPath, {params: {archived: archived}});

  if (archived) {
    dispatch({
      type: GET_MY_DOCUMENTS_ARCHIVED,
      payload: {documentList: res.data, pageCount: pageCountRes.data}
    });
  } else {
    dispatch({
      type: GET_MY_DOCUMENTS_OPEN,
      payload: {documentList: res.data, pageCount: pageCountRes.data}
    });
  }
};

export const getReceivedDocuments = (resolved, pageNumber) => async dispatch => {
  const path = properties.serverURL + DOCUMENTS_RECEIVED_URL;
  const res = await axios.get(path, {params: {resolved: resolved, page: pageNumber}});

  const pageCountPath = path + PAGE_COUNT_PATH;
  const pageCountRes = await axios.get(pageCountPath, {params: {resolved: resolved}});

  if (resolved) {
    dispatch({
      type: GET_DOCUMENTS_RECEIVED_RESOLVED,
      payload: {documentList: res.data, pageCount: pageCountRes.data}
    });
  } else {
    dispatch({
      type: GET_DOCUMENTS_RECEIVED_OPEN,
      payload: {documentList: res.data, pageCount: pageCountRes.data}
    });
  }
};

export const getReceivedArchivedDocuments = (pageNumber) => async dispatch => {
  const path = properties.serverURL + DOCUMENTS_RECEIVED_ARCHIVED_URL;
  const res = await axios.get(path, {params: {page: pageNumber}});

  const pageCountPath = path + PAGE_COUNT_PATH;
  const pageCountRes = await axios.get(pageCountPath);

  dispatch({
    type: GET_DOCUMENTS_RECEIVED_ARCHIVED,
    payload: {documentList: res.data, pageCount: pageCountRes.data}
  });
};

export const saveSearchDetails = searchDetails => async dispatch => {
  dispatch({
    type: SAVE_SEARCH_DETAILS,
    payload: searchDetails
  });
}

export const archiveDocument = (registryNumber, archivingMessage, pageNumber) => async dispatch => {
  const path = properties.serverURL + DOCUMENTS_URL + "/" + registryNumber + ARCHIVE_DOCUMENT_URL;
  await axios.put(path, null, {params: {archivingMessage: archivingMessage}});

  const getMyDocumentsPath = properties.serverURL + MY_DOCUMENTS_URL;
  const resOpen = await axios.get(getMyDocumentsPath, {params: {archived: false, page: pageNumber}});
  const resArchived = await axios.get(getMyDocumentsPath, {params: {archived: true, page: pageNumber}});

  const pageCountPathOpen = getMyDocumentsPath + PAGE_COUNT_PATH;
  const pageCountResOpen = await axios.get(pageCountPathOpen, {params: {archived: false}});
  const pageCountResArchived = await axios.get(pageCountPathOpen, {params: {archived: true}});

  dispatch({
    type: GET_MY_DOCUMENTS_OPEN,
    payload: {documentList: resOpen.data, pageCount: pageCountResOpen.data}
  });
  dispatch({
    type: GET_MY_DOCUMENTS_ARCHIVED,
    payload: {documentList: resArchived.data, pageCount: pageCountResArchived.data}
  });
}

export const resolveDocument = (registryNumber, resolvedMessage, pageNumber) => async dispatch => {
  const path = properties.serverURL + DOCUMENTS_URL + "/" + registryNumber + RESOLVE_DOCUMENT_URL;
  await axios.put(path, null, {params: {resolvedMessage: resolvedMessage}});

  const pathReceived = properties.serverURL + DOCUMENTS_RECEIVED_URL;
  const resReceivedOpen = await axios.get(pathReceived, {params: {resolved: false, page: pageNumber}});
  const resReceivedResolved = await axios.get(pathReceived, {params: {resolved: true, page: 1}});

  const pageCountPathReceived = pathReceived + PAGE_COUNT_PATH;
  const pageCountResReceivedOpen = await axios.get(pageCountPathReceived, {params: {resolved: false}});
  const pageCountResReceivedResolved = await axios.get(pageCountPathReceived, {params: {resolved: true}});

  dispatch({
    type: GET_DOCUMENTS_RECEIVED_OPEN,
    payload: {documentList: resReceivedOpen.data, pageCount: pageCountResReceivedOpen.data}
  });
  dispatch({
    type: GET_DOCUMENTS_RECEIVED_RESOLVED,
    payload: {documentList: resReceivedResolved.data, pageCount: pageCountResReceivedResolved.data}
  });
}