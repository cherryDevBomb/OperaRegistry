
export const getDefaultSearchDetails = () => {
  return {
    originType: "Oricare",
    originUsers: [],
    origin: "",
    destinationType: "Oricare",
    destinationUsers: [],
    destination: "",
    state: "Oricare",
    searchStr: "",
    createdDate: "Oricând",
    from: new Date(),
    to: new Date()
  };
}

export const getSearchParams = searchDetails => {
  return {};
};