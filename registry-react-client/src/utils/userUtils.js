
export const getFullName = user => {
  return user.firstName + " " + user.lastName;
};

export const getInitials = user => {
  return user.firstName[0] + user.lastName[0];
}