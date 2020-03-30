
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
    to: new Date()
  };
}

export const getSearchParams = searchDetails => {
  let searchParams = {};

  const docTypes = mapSearchDetailsTypesToDocTypes(searchDetails.originType, searchDetails.destinationType);

  
};

const mapSearchDetailsTypesToDocTypes = (origin, destination) => {
  const INTERNAL = "INTERNAL";
  const ORIGIN_EXTERNAL = "ORIGIN_EXTERNAL";
  const DESTINATION_EXTERNAL = "DESTINATION_EXTERNAL";
  
  let docTypes;
  
  if (origin === "Extern" && destination === "Extern") {
    docTypes = [];
  }
  else if (origin === "Extern") {
    docTypes = [ORIGIN_EXTERNAL];
  }
  else if (destination === "Extern") {
    docTypes = [DESTINATION_EXTERNAL];
  }
  else if (origin === "Oricine" && destination === "Oricine") {
    docTypes = [INTERNAL, ORIGIN_EXTERNAL, DESTINATION_EXTERNAL]
  }
  else if (origin === "Oricine") {
    docTypes = [INTERNAL, ORIGIN_EXTERNAL]
  }
  else if (destination === "Oricine") {
    docTypes = [INTERNAL, DESTINATION_EXTERNAL]
  }
  else {
    docTypes = [INTERNAL]
  }
  
  return docTypes;
}