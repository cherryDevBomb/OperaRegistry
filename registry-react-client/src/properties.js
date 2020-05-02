export const properties = {
  serverURL: "http://localhost:8080/registryServices"
};

// REST URL paths
export const REGISTER_URL = "/users/register";
export const LOGIN_URL = "/users/login";

export const USERS_URL = "/users";
export const USERS_GROUPED_URL = "/users/grouped";

export const DOCUMENTS_URL = "/documents";
export const MY_DOCUMENTS_URL = "/documents/created";
export const DOCUMENTS_RECEIVED_URL = "/documents/received";
export const DOCUMENTS_RECEIVED_ARCHIVED_URL = "/documents/received/archived";
export const ARCHIVE_DOCUMENT_URL = "/archive";
export const RESOLVE_DOCUMENT_URL = "/resolve";

export const PAGE_COUNT_PATH = "/page-count"

export const FILES_URL = "/files";

export const REPORT_URL = "/reports"

// client side routes
export const REGISTER_PATH = "/register";
export const LOGIN_PATH = "/login";
export const LOGOUT_PATH = "/logout";

export const DOCUMENTS_PATH = "/documents";
export const MY_DOCUMENTS_PATH = "/my-documents";
export const RECEIVED_DOCUMENTS_PATH = "/received-documents";
export const NEW_DOCUMENT_PATH = "/new-document";

//app constants
export const INTERNAL_DOC_TYPE = "INTERNAL";
export const ORIGIN_EXTERNAL_DOC_TYPE = "ORIGIN_EXTERNAL";
export const DESTINATION_EXTERNAL_DOC_TYPE = "DESTINATION_EXTERNAL";