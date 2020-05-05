const INTERNAL = "INTERNAL";
const ORIGIN_EXTERNAL = "ORIGIN_EXTERNAL";
const DESTINATION_EXTERNAL = "DESTINATION_EXTERNAL";

export const getDefaultSearchDetails = () => {
  return {
    originType: "Oricine",
    originUsers: [],
    destinationType: "Oricine",
    destinationUsers: [],
    state: "Oricare",
    searchStr: "",
    createdDate: "Oricând",
    from: new Date(),
    to: new Date(),
    showDropdown: false
  };
}

export const getSearchParams = (searchDetails, pageNumber, searchId) => {
  let searchParams = {};

  const docTypes = mapSearchDetailsTypesToDocTypes(searchDetails.originType, searchDetails.destinationType);
  if (docTypes.length < 3) {
    searchParams.docTypes = docTypes;
  }

  if (searchDetails.originType === "O anumită persoană") {
    searchParams.createdByList = searchDetails.originUsers.map(user => user.userId);
  }

  if (searchDetails.destinationType === "O anumită persoană") {
    searchParams.recipientList = searchDetails.destinationUsers.map(user => user.userId);
  }

  if (searchDetails.state !== "Oricare") {
    searchParams.archived = searchDetails.state === "Arhivate" ? true : false;
  }

  if (searchDetails.searchStr !== "") {
    searchParams.searchString = searchDetails.searchStr;
  }

  if (searchDetails.createdDate !== "Oricând") {
    const interval = mapSearchDetailsCreatedDate(searchDetails);
    searchParams.from = interval.from;
    searchParams.to = interval.to;
  }

  if (pageNumber) {
    searchParams.page = pageNumber;
  }
  searchParams.searchId = searchId;

  return searchParams;
};

const mapSearchDetailsTypesToDocTypes = (origin, destination) => {
  let docTypes;

  if (origin === "Extern" && destination === "Extern") {
    docTypes = [];
  } else if (origin === "Extern") {
    docTypes = [ORIGIN_EXTERNAL];
  } else if (destination === "Extern") {
    docTypes = [DESTINATION_EXTERNAL];
  } else if (origin === "Oricine" && destination === "Oricine") {
    docTypes = [INTERNAL, ORIGIN_EXTERNAL, DESTINATION_EXTERNAL]
  } else if (origin === "Oricine") {
    docTypes = [INTERNAL, ORIGIN_EXTERNAL]
  } else if (destination === "Oricine") {
    docTypes = [INTERNAL, DESTINATION_EXTERNAL]
  } else {
    docTypes = [INTERNAL]
  }
  return docTypes;
}

const mapSearchDetailsCreatedDate = searchDetails => {
  let interval = {};
  let fromDate;
  let toDate;

  const today = new Date();
  if (searchDetails.createdDate === "Astăzi") {
    fromDate = today;
    toDate = today;
  } else if (searchDetails.createdDate === "Ieri") {
    toDate = today;
    fromDate = new Date(new Date().setDate(today.getDate() - 1));
  } else if (searchDetails.createdDate === "În ultimile 7 zile") {
    toDate = today;
    fromDate = new Date(new Date().setDate(today.getDate() - 7));
  } else if (searchDetails.createdDate === "În ultimile 30 de zile") {
    toDate = today;
    fromDate = new Date(new Date().setDate(today.getDate() - 30));
  } else if (searchDetails.createdDate === "Personalizat") {
    fromDate = searchDetails.from;
    toDate = searchDetails.to;
  }

  interval = {
    from: fromDate.toLocaleDateString("en-GB"),
    to: toDate.toLocaleDateString("en-GB")
  }
  return interval;
}