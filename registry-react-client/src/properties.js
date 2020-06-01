export const properties = {
  serverURL: "http://localhost:8080/registryServices"
};

// REST URL paths
export const REGISTER_URL = "/users/register";
export const LOGIN_URL = "/users/login";

export const USERS_URL = "/users";
export const USERS_GROUPED_URL = "/users/grouped";
export const USERS_BY_ROLE_URL = "/role";
export const DEPARTMENTS_URL = "/departments"

export const ADMIN_URL = "/admin";
export const PENDING_USERS_URL = "/admin/pending";
export const CONFIRM_REGISTRATION_URL = "/confirm";
export const DECLINE_REGISTRATION_URL = "/decline";
export const GRANT_ADMIN_ROLE_URL = "/grant";

export const DOCUMENTS_URL = "/documents";
export const MY_DOCUMENTS_URL = "/documents/created";
export const DOCUMENTS_RECEIVED_URL = "/documents/received";
export const DOCUMENTS_RECEIVED_ARCHIVED_URL = "/documents/received/archived";
export const USERS_AVAILABLE_URL = "/available-receivers"
export const ARCHIVE_DOCUMENT_URL = "/archive";
export const RESOLVE_DOCUMENT_URL = "/resolve";

export const PAGE_COUNT_PATH = "/page-count"

export const FILES_URL = "/files";

export const REPORT_URL = "/reports"

// client side routes
export const LOGIN_PATH = "/";
export const REGISTER_PATH = "/register";
export const LOGOUT_PATH = "/logout";

export const DOCUMENTS_PATH = "/documents";
export const MY_DOCUMENTS_PATH = "/my-documents";
export const RECEIVED_DOCUMENTS_PATH = "/received-documents";
export const NEW_DOCUMENT_PATH = "/new-document";

export const ADMIN_PATH = "/admin";
export const HELP_PATH = "/help";